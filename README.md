# vue-firebase-project

[Vue.js＋Firebaseプロジェクト作成(Hosting、Authentication、Firestore、Storage、Functions)](https://qiita.com/yoshi0518/items/e16d600a06f9acb2f815)

## プロジェクト利用手順

### リポジトリをクローン
```
git clone <url> <ディレクトリ名>
```

### セットアップ
```
cd <ディレクトリ名>
npm install

cd functions
npm install
```

### FirebaseプロジェクトID変更

#### firebaseによる変更

```
firebase use <プロジェクトID>

#別のGoogleアカウントに変更する場合
firebase logout
firebase login
```

#### 設定ファイルを修正

「.firebaserc」のプロジェクトIDを変更

### Functions設定変更

「functions/index.js」の『funcLoginAuthentication』でチェックしているドメインを変更

### Storage CORS設定

https://qiita.com/yoshi0518/items/25af102845ba05545f98#%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E5%AF%BE%E7%AD%96%E3%81%AE%E8%A8%AD%E5%AE%9A

### ビルド

```
npm run build
```

### Firebaseデプロイ

```
firebase deploy

#Hostingのみ
firebase deploy --only hosting

#Functionsのみ
firebase deploy --only functions
```
