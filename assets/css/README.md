=====記述ルール=====

ルール１　プロパティの並び順
１．位置関係 = position,flex,top,right,left,display,float
２．サイズ = widht, height,padding, marign
３．文字系 = font, text-align, line-height, letter-spacing, color
４．背景 = background, border
５．その他 = animation, opacity, transition 等

ルール２　インデント
１．クラス名と鉤括弧の間に半角スペース
２．プロパティ（青文字） はクラス名より半角スペース２つ内側　【VS Code デフォ】
３．値は半角スペースの後に書き始める　【VS Code デフォ】
４．ルール度に基本１行あける

.example,
.example1 {
　 display: block;
　 float: left;
　 width: 16.6%;
　 height: 70px;
　 padding: 0 0 10% 0;
　 margin: 0 auto;
　 font: 400 14px 'open sans',sans-serif;
　 color: #333;
　 line-height: 20px;
　 text-align: center;
　 background: #fff;
　 cursor: pointer;
　 border-bottom:2px solid #ddd;
}

ルール３　 ID の使用
１．CSS のスタイリングでは原則使用しない。
２．JS でマーキングする時や、内部リンクでマーキングする場合に使う

ルール４　例外
１．プロパティが１つしかない場合、１列に書く
２．１列にである class が同類である場合、１行開けずに記述する

.example { background: url(example.png) no-repeat center center; }
.example1 { background: url(example.png) no-repeat center center; }

.example2 { background-color: red; }
