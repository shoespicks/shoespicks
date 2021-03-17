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
２．１列にある class が同類である場合、１行開けずに記述する

.example { background: url(example.png) no-repeat center center; }
.example1 { background: url(example.png) no-repeat center center; }

.example2 { background-color: red; }

ルール５　 CSS 命名規則

5-1 　枠組みの名前付け方
　 Sec ＞ Wrap ＞ Con ＞ Box

5-2 　役割を示す名前
　　　　名前読んだら、何を表しているか分かる命名
　　　　英単語２語〜３語
　　　　キャメルケース

　　例: 共通部分の場合
　　　　要素・文字囲い　 spacL spaceM spaceS
　　　　文字サイズ textL textM textS textSub
　　　　文字　太さ fw-bold
　　　　文字　色 fc-white fc-black fc-indigo fc-skyblue 　 fc-orange
　　　　背景　色 bc-white bc-indigo bc-Dindigo bc-indigo bc-skyblue
　　　　背景画像 bg-ファイル名　　(拡張子なし)　 bg-web bg-design
　　　　ボタン btn bg-white bg-orange
　　　　フォーム form
　　　　複数ページにまたがる container を作りたい時 flex-container
　　例：index.vue のトップページの場合
　　　　種目で選ぶ: .menuEvent
　　　　ランキングで選ぶ: .menuRanking
　　例：spikeSerch.vue のスパイク図鑑ページの場合
　　　　フィルター : .filter
　　　　メーカーロゴ :　.makerLogo
　　　　スパイクリスト: .spikeImg, .spikePrice, .spikeTitle
　　例: \_id.vue の詳細ページ
　　　　レビュー: .pubReview
　　　　比較チャート: .cmpChart
　　　　基本情報: .detailInfo
　　　　一流選手: .playerVoice
　　　　商品紹介: .productDetail
　　　　おすすめ: .recommendType
