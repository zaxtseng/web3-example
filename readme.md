# 项目初始化
新建文件夹client和smart_contract.

```bash
cd client
pnpm create vite ./ --template react-ts 
pnpm i
```
## 安装tailwindcss
```bash
pnpm add -D tailwindcss postcss autoprefixer
```
## 初始化tailwindcss
```bash
npx tailwindcss init -p
```
## 修改config文件
```cjs
// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
## 添加tailwindcss到css文件
```css
/** index.css */ 
@tailwind base;
@tailwind components;
@tailwind utilities;
```