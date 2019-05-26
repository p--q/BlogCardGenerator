import onCopy from "./oncopy.js";
import { createElem as E, createTxtNode as T, createTree } from "./tree.js";
window['bookmarkletfunc'] = mydomain => {  // 引数は引用符をつけないドメイン。例: p--q.blogspot.com
	let elem; // 要素を入れる変数。
	let selectedtxt = window.getSelection().toString();  // 選択文字列を取得。
	let ogp = {
		title: selectedtxt || getOGP("title") || document.title,
		img: getOGP("image"), 	
		desp: getOGP("description"), 	
		url: document.URL,
		domain: location.host
	};  // 選択文字列があればそれを、OGP設定がないときはページタイトルをタイトルとして取得する。
	if (ogp.img.startsWith("/")) {  // /から始まっているurlはプロトコールとドメインを追加する。
		ogp.img = location.protocol + "//" + ogp.domain + ogp.img;
	}
	let root = createTree([
					[E("div", {"class": "blogcard"}),
						[E("div", {"class": "blogcard-content"}),
							[E("div", {"class": "blogcard-text"}),
								E("div", {"class": "blogcard-title"}),
									E("a", {"href": ogp.url, "target": "_blank"}, ogp.title)
							],
								E("blockquote", {"cite": ogp.url}),
									E("div", {"class": "blogcard-description"}, ogp.desp)
						],
							E("div", {"class": "blogcard-image"}),
								E("div", {"class": "blogcard-image-wrapper"}),
									E("a", {"href": ogp.url, "target": "_blank"}),
										E("img", {"alt": "", "height": "100", "width": "100", "src": ogp.img})
					],
						E("div", {"class": "blogcard-footer"}),
							[E("a", {"href": ogp.domain, "target": "_blank"}),
								E("img", {"alt": "", "src": "https://www.google.com/s2/favicons?domain={}".replace("{}", ogp.domain)})
							],
								T(ogp.domain)
				]) // ルートノードから始まる、ツリーにするノードの配列。サムネイル画像サイズは決め打ちしている。
	if (!ogp.img) { // OGP画像ないとき。		
		root.classList.add("blogcard-hasnoimage");  // ルートノードのクラス名を追加。
		elem = document.evaluate("//div[@class='blogcard-image']", root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ;
		elem.parentNode.removeChild(elem);  // <div class='blogcard-image'></div>を削除。
	}	
	if (selectedtxt || !ogp.desp) {  // 選択文字列があるとき、または、OGPサマリがないとき。
		elem = document.evaluate("//blockquote", root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ;
		elem.parentNode.removeChild(elem);  // <blockquote></blockquote>を削除。
	} else if (ogp.domain==mydomain) {  // 自分のドメインのときは引用符のみ削除。			
		elem = document.evaluate("//blockquote", root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ;
		elem.parentNode.insertBefore(elem.firstElementChild, elem);  // <blockquote>の子要素を親要素に付け替える。
		elem.parentNode.removeChild(elem);  // <blockquote></blockquote>を削除。
	}
	onCopy(root.outerHTML);  // ツリーをHTML文字列に変換してクリップボードにコピー。
	function getOGP(txt){return document.evaluate("//meta[@property='og:{}']/@content".replace("{}", txt), document, null, XPathResult.STRING_TYPE, null).stringValue;}
};
