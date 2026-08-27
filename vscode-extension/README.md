# 胡桃（Hutao）动态皮肤 · VSCode / Trae / CodeX 扩展

在 VSCode / Trae-IDE / CodeX 侧边栏打开胡桃动态皮肤：点击播放大招中文语音「吃饱喝饱，一路走好！」+ 赤焰爆发动画（血梅绽放/冲击波/火光/火星）；支持**切换壁纸**；胶囊右键「一键卸载」。

## 安装

方式一：源码直装（开发模式）
1. 把本文件夹放到任意位置
2. VSCode / Trae / CodeX：命令面板执行 `code --extensionDevelopmentPath="."`（Trae/CodeX 用各自 CLI）

方式二：使用仓库内已打包好的 VSIX（推荐）
1. 从 GitHub 仓库 `vscode-extension/genshen-hutao-skin-1.0.0.vsix` 下载 VSIX 文件
2. VSCode / Trae / CodeX：扩展 → “…” 菜单 → 从 VSIX 安装，选中该文件
   （或命令行：`code --install-extension genshen-hutao-skin-1.0.0.vsix`）

方式三：重新打包 VSIX
1. 已安装 Node.js / npm 的环境双击 `build.bat`（内部执行 `npm install -g @vscode/vsce` + `vsce package`）
2. 生成 `genshen-hutao-skin-1.0.0.vsix`

## 使用

- 命令面板（Ctrl+Shift+P）运行「胡桃皮肤：显示」
- 皮肤面板：左键点击 = 释放元素爆发；拖动 = 移动；右键 = 菜单（释放/切换壁纸/收起/一键卸载）
- 收起后为“胡桃 ✦”胶囊，胶囊右键 → **一键卸载**（走 VSCode 扩展卸载流程）

## 说明

- 素材（立绘/壁纸/语音）版权归米哈游（miHoYo/HoYoverse），仅供个人学习娱乐（见 LICENSE.txt）。
- 若卸载按钮未弹出确认框，请在扩展面板中手动卸载。
