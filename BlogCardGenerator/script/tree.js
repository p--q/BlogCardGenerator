// ノードツリーの生成。
function createElem(tag, props, txt=""){  // タグ名、プロパティの辞書、テキストノードにするテキスト。
	let elem = document.createElement(tag);  // 要素を作成。
	Object.keys(props).forEach(k => elem.setAttribute(k, props[k]));  // 要素のプロパティを設定。				
	txt && elem.appendChild(createTxtNode(txt));  // テキストノードがあれば挿入。		
	return elem;  // 要素を返す。
}
function createTxtNode(txt){return document.createTextNode(txt);}  // テキストノードを返す。
function createTree(nodes){  // ノードの配列を受け取って、再帰的に子要素にしてツリーにして返す。二分木しか作れない。[[A,B,C,D],E,F,G]を渡した場合、BとEの親がAとなる。
	let root;  // ルートを入れる変数。
	nodes.reduce((prev, curr) => {  // prevが親、currが子。
			if (Array.isArray(prev)){  // 親が配列のときはまず子のツリーを作る。
				prev = createTree(prev);  // 配列をツリーにしたルートを取得。
			} 		
			if (!root) {  // ルートがまだ取得できていないとき。
				root = prev;  // 最初のツリーのルートをこのツリーのルートとして取得。
			}
			if (Array.isArray(curr)){  // 子が配列のときはまず子のツリーを作る。
				curr = createTree(curr);  // 配列をツリーにしたルートを取得。
			} 
			return prev.appendChild(curr);  // 子要素currを返す。次のprevになる。
		}); 			
	return root;  // 木のルートを返す。
}
export { createElem, createTxtNode, createTree };
