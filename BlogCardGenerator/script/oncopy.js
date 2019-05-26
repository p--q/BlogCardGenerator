// テキストをクリップボードにコピーする。MimeTypeをtext/htmlでもコピーする。
export default html => {
	document.addEventListener("copy", onCopy, true);  // targetは何でもよいので、capture phase、つまりドキュメントから行きの伝播を捉える。
	document.execCommand("copy");   // コピーイベントを発生させる。
	document.removeEventListener("copy", onCopy, true);  // リスナーの除去。	
	function onCopy(ev) {  // イベントリスナー。	
		ev.clipboardData.setData("text/plain", html);  // textとしてペーストするとき。必須。これがないとクリップボードに何も渡されない。
		ev.clipboardData.setData("text/html", html);  // htmlとしてペーストするとき。
		ev.preventDefault();  // デフォルトの動作を止める。そうしないとクリップボードに元の値が入ってしまう。
		ev.stopPropagation();  // これよりイベントの伝播を止める。
	}
};
