// ============================================================
// 胡桃（Hutao）动态皮肤插件 · Client（独立版）
// ------------------------------------------------------------
// 功能（对标丝柯克动态皮肤）：
//   - 右下角 320px 胡桃皮肤挂件，可拖拽、可收起（× → 胶囊）
//   - 点击皮肤：播放元素爆发「安神秘法」中文大招语音
//     「吃饱喝饱，一路走好！」+ 爆发动画（赤焰闪光、血梅绽放、
//     火焰冲击波、三道火光、火星飞散、技能名与台词字幕）
//   - 右键皮肤/胶囊：菜单（释放元素爆发 / 切换壁纸 / 收起 / 一键卸载）
//   - 三张壁纸自由切换：壁纸·其一（立绘）/ 壁纸·其二 / 壁纸·其三
// ------------------------------------------------------------
// 素材说明：
//   - 语音与壁纸由 host.js 的 /hutao-skin/ 路由提供（全画质原图）。
//     未加载 host.js 时：壁纸显示占位图，点击只播动画不播语音。
//   - 想要单文件零配置（壁纸+语音内嵌），请使用 client-standalone.js。
// ============================================================
// 语音 data URI：本文件为 null（走 Host 路由）；client-standalone.js
// 会把这一行替换为内嵌语音（MP3，来自原神BWIKI「胡桃/语音」）。
const BURST_DATA_URI = null

// 三张壁纸的默认素材地址（占位图）。
// client-standalone.js 会把这三项替换为内嵌高清壁纸 data URI，
// 实现「只粘贴 client.js 即可用」的零配置安装。
const WALL_DEFAULT_URIS = [
  /*WALL1*/ 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MDAiIGhlaWdodD0iNjg4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzZDBiMDUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZTA1MDMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjY4OCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjM1MCIgeT0iMjg4Ljk2IiBmb250LXNpemU9IjcyIiBmaWxsPSIjZmZiMDhlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmIj7og6HmoYM8L3RleHQ+PHRleHQgeD0iMzUwIiB5PSIzNzguNDAwMDAwMDAwMDAwMDMiIGZvbnQtc2l6ZT0iMzQiIGZpbGw9IiNmZmQ5YzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiPuWjgee6uMK35YW25LiAPC90ZXh0Pjx0ZXh0IHg9IjM1MCIgeT0iNDU0LjA4MDAwMDAwMDAwMDA0IiBmb250LXNpemU9IjIwIiBmaWxsPSIjZmY5YzZiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmIj7liqDovb0gaG9zdC5qcyDlkI7oh6rliqjliIfmjaLljp/lm748L3RleHQ+PC9zdmc+',
  /*WALL2*/ 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9IjcyMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjM2QwYjA1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMWUwNTAzIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEyODAiIGhlaWdodD0iNzIwIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNjQwIiB5PSIzMDIuNCIgZm9udC1zaXplPSI3MiIgZmlsbD0iI2ZmYjA4ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ik1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiI+6IOh5qGDPC90ZXh0Pjx0ZXh0IHg9IjY0MCIgeT0iMzk2LjAwMDAwMDAwMDAwMDA2IiBmb250LXNpemU9IjM0IiBmaWxsPSIjZmZkOWMyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmIj7lo4HnurjCt+WFtuS6jDwvdGV4dD48dGV4dCB4PSI2NDAiIHk9IjQ3NS4yMDAwMDAwMDAwMDAwNSIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmOWM2YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ik1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiI+5Yqg6L29IGhvc3QuanMg5ZCO6Ieq5Yqo5YiH5o2i5Y6f5Zu+PC90ZXh0Pjwvc3ZnPg==',
  /*WALL3*/ 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgwIiBoZWlnaHQ9IjcyMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjM2QwYjA1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMWUwNTAzIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEyODAiIGhlaWdodD0iNzIwIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNjQwIiB5PSIzMDIuNCIgZm9udC1zaXplPSI3MiIgZmlsbD0iI2ZmYjA4ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ik1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiI+6IOh5qGDPC90ZXh0Pjx0ZXh0IHg9IjY0MCIgeT0iMzk2LjAwMDAwMDAwMDAwMDA2IiBmb250LXNpemU9IjM0IiBmaWxsPSIjZmZkOWMyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmIj7lo4HnurjCt+WFtuS4iTwvdGV4dD48dGV4dCB4PSI2NDAiIHk9IjQ3NS4yMDAwMDAwMDAwMDAwNSIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmOWM2YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ik1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiI+5Yqg6L29IGhvc3QuanMg5ZCO6Ieq5Yqo5YiH5o2i5Y6f5Zu+PC90ZXh0Pjwvc3ZnPg==',
]

const CSS = `
.hutao-root { position: fixed; z-index: 99990; pointer-events: auto; user-select: none; -webkit-user-select: none; touch-action: none; }
.hutao-card { position: relative; width: 320px; height: auto; cursor: pointer; border-radius: 30px; }
.hutao-img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 30px;
  border: 1px solid rgba(255, 107, 82, .5); background: #1c0604;
  box-shadow: 0 14px 48px rgba(0, 0, 0, .55), 0 0 0 1px rgba(255, 130, 90, .16) inset;
  animation: hutao-bob 3.6s ease-in-out infinite; }
.hutao-card:hover .hutao-img { box-shadow: 0 14px 54px rgba(255, 90, 60, .55), 0 0 30px rgba(255, 110, 80, .4); }
@keyframes hutao-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
.hutao-is-bursting .hutao-img { animation: hutao-shake .55s ease-in-out; }
@keyframes hutao-shake {
  0% { transform: translate(0, 0) rotate(0deg); }
  15% { transform: translate(-12px, 4px) rotate(-2.5deg); }
  30% { transform: translate(12px, -5px) rotate(2.5deg); }
  45% { transform: translate(-10px, 3px) rotate(-1.8deg); }
  60% { transform: translate(9px, -3px) rotate(1.8deg); }
  80% { transform: translate(-4px, 0) rotate(-.6deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
.hutao-burst { position: absolute; inset: 0; border-radius: 30px; pointer-events: none; overflow: visible; }
.hutao-flash { position: absolute; inset: 0; border-radius: 30px;
  background: radial-gradient(circle at 50% 38%, rgba(255, 226, 168, .98), rgba(255, 92, 56, .55) 45%, rgba(122, 12, 8, .22) 75%, transparent 100%);
  animation: hutao-flash .6s ease-out forwards; }
@keyframes hutao-flash { 0% { opacity: 0; } 12% { opacity: 1; } 100% { opacity: 0; } }
.hutao-bloom { position: absolute; left: 50%; top: 46%; width: 200px; height: 200px; margin: -100px 0 0 -100px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 238, 205, .95) 0%, rgba(255, 126, 68, .75) 26%, rgba(226, 42, 24, .4) 50%, transparent 72%);
  animation: hutao-bloom .85s cubic-bezier(.12, .68, .32, 1) forwards; }
@keyframes hutao-bloom { 0% { opacity: 0; transform: scale(.25) rotate(0deg); } 18% { opacity: 1; } 100% { opacity: 0; transform: scale(1.55) rotate(24deg); } }
.hutao-shock { position: absolute; left: 50%; top: 50%; width: 230px; height: 230px; margin: -115px 0 0 -115px; border-radius: 50%;
  border: 5px solid rgba(255, 118, 74, .92); animation: hutao-shock .7s cubic-bezier(.1, .7, .3, 1) forwards; }
@keyframes hutao-shock { 0% { transform: scale(.2); opacity: .95; } 100% { transform: scale(2.1); opacity: 0; } }
.hutao-slash { position: absolute; height: 5px; border-radius: 4px; opacity: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 226, 170, .95) 30%, rgba(255, 98, 60, .92) 60%, transparent);
  filter: drop-shadow(0 0 10px rgba(255, 100, 50, .9)); }
.hutao-slash-1 { left: -30%; top: 30%; width: 160%; transform: rotate(-14deg); animation: hutao-slash-a .55s ease-out .05s forwards; }
.hutao-slash-2 { left: -30%; top: 62%; width: 160%; transform: rotate(9deg); animation: hutao-slash-b .55s ease-out .12s forwards; }
.hutao-slash-3 { left: 10%; top: -20%; width: 5px; height: 140%; transform: rotate(18deg); animation: hutao-slash-c .6s ease-out .18s forwards; }
@keyframes hutao-slash-a { 0% { opacity: 0; transform: translateX(0) rotate(-14deg) scaleX(.4); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateX(170px) rotate(-14deg) scaleX(1.1); } }
@keyframes hutao-slash-b { 0% { opacity: 0; transform: translateX(0) rotate(9deg) scaleX(.4); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateX(-170px) rotate(9deg) scaleX(1.1); } }
@keyframes hutao-slash-c { 0% { opacity: 0; transform: translateY(80px) rotate(18deg) scaleY(.3); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateY(-150px) rotate(18deg) scaleY(1.2); } }
.hutao-stars { position: absolute; inset: 0; }
.hutao-star { position: absolute; left: 50%; top: 50%; width: 18px; height: 18px; margin: -9px 0 0 -9px;
  color: #ffd9ae; font-size: 18px; line-height: 18px; text-align: center; opacity: 0;
  text-shadow: 0 0 12px rgba(255, 170, 90, .95), 0 0 24px rgba(255, 90, 40, .8);
  animation: hutao-star-fly .95s ease-out forwards; }
@keyframes hutao-star-fly {
  0% { opacity: 0; transform: translate(0, 0) scale(.3) rotate(0deg); }
  14% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.25) rotate(200deg); }
}
.hutao-shards { position: absolute; inset: 0; }
.hutao-shard { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 2px;
  background: linear-gradient(135deg, #fff1dc, #ff9c5e 55%, #d92b1e);
  box-shadow: 0 0 12px rgba(255, 100, 60, .95); opacity: 0;
  animation: hutao-shard-fly .8s ease-out forwards; }
@keyframes hutao-shard-fly {
  0% { opacity: 0; transform: translate(0, 0) scale(.4); }
  12% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.15) rotate(220deg); }
}
.hutao-skill { position: absolute; left: 0; right: 0; top: -48px; text-align: center; white-space: nowrap;
  color: #ffc9a6; font: 700 19px/1 'Microsoft YaHei', sans-serif; text-shadow: 0 0 14px rgba(255, 110, 60, .95), 0 1px 2px #000;
  animation: hutao-text .95s ease-out forwards; }
.hutao-line { position: absolute; left: 0; right: 0; bottom: -58px; text-align: center; white-space: nowrap;
  color: #ffe7d4; font: 700 24px/1 'Microsoft YaHei', sans-serif; letter-spacing: 4px; text-shadow: 0 0 16px rgba(255, 100, 60, .95), 0 1px 3px #000;
  animation: hutao-line-in 1.9s ease-out forwards; }
@keyframes hutao-text { 0% { opacity: 0; transform: translateY(8px); } 20% { opacity: 1; transform: translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateY(-6px); } }
@keyframes hutao-line-in { 0% { opacity: 0; transform: scale(.85); } 12% { opacity: 1; transform: scale(1); } 80% { opacity: 1; } 100% { opacity: 0; } }
.hutao-close { position: absolute; right: -12px; top: -12px; width: 30px; height: 30px; border: none; border-radius: 50%;
  background: rgba(26, 8, 6, .85); color: #ffc9a6; font: 700 17px/30px sans-serif; cursor: pointer; padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .5); }
.hutao-close:hover { background: rgba(150, 36, 24, .95); color: #fff; }
.hutao-warn { position: absolute; left: -12px; top: -12px; width: 26px; height: 26px; border-radius: 50%; background: #b3402e; color: #fff; text-align: center; font: 700 14px/26px sans-serif; box-shadow: 0 2px 8px rgba(0, 0, 0, .5); }
.hutao-pill { position: fixed; z-index: 99990; pointer-events: auto; border: 1px solid rgba(255, 110, 80, .55); border-radius: 999px; padding: 10px 22px;
  background: rgba(28, 8, 5, .92); color: #ffd9c2; font: 700 16px/1.4 'Microsoft YaHei', sans-serif; cursor: pointer; user-select: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, .5); }
.hutao-pill:hover { background: rgba(160, 40, 26, .95); }
.hutao-menu-backdrop { position: fixed; inset: 0; z-index: 99998; }
.hutao-menu { position: fixed; z-index: 99999; min-width: 210px; padding: 6px; border-radius: 12px;
  background: rgba(24, 7, 4, .96); border: 1px solid rgba(255, 105, 75, .45); box-shadow: 0 10px 30px rgba(0, 0, 0, .55);
  color: #ffd9c2; font: 13px/1.3 'Microsoft YaHei', sans-serif; }
.hutao-menu-item { padding: 9px 14px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
.hutao-menu-item:hover { background: rgba(170, 45, 28, .6); }
.hutao-menu-item.danger { color: #ffb4a8; }
.hutao-menu-item.danger:hover { background: rgba(200, 60, 60, .6); color: #fff; }
.hutao-menu-label { padding: 7px 14px 3px; font-size: 11px; letter-spacing: 1px; color: rgba(255, 201, 166, .5); cursor: default; }
.hutao-menu-sep { height: 1px; background: rgba(255, 105, 75, .2); margin: 4px 6px; }
`

return {
  apply(ctx) {
    const slots = ctx.get('slots')
    if (slots === undefined) return
    const disposeStyle = styles.insert(CSS)
    ctx.effect(() => disposeStyle)
    const VOICE_TEXT = '吃饱喝饱，一路走好！'
    const SKILL_TEXT = '元素爆发 · 安神秘法'
    const PARTICLE_COUNT = 18
    const STAR_COUNT = 10
    const CARD_W = 320
    const MAX_CARD_H = 560
    const WALLS = [
      { name: '壁纸·其一', uri: WALL_DEFAULT_URIS[0], aspect: 688 / 700 },
      { name: '壁纸·其二', uri: WALL_DEFAULT_URIS[1], aspect: 676 / 700 },
      { name: '壁纸·其三', uri: WALL_DEFAULT_URIS[2], aspect: 486 / 700 },
    ]
    const cardHeightFor = (aspect) => Math.min(MAX_CARD_H, Math.round(CARD_W * aspect))
    let disposeSlot = null

    const uninstallAll = async () => {
      try { await host.call('hutao-uninstall', null) } catch (e) { console.warn('hutao-skin: host uninstall call failed', e) }
      try { if (disposeSlot !== null) disposeSlot() } catch (e) { console.warn('hutao-skin: slot dispose failed', e) }
      try { disposeStyle() } catch (e) { console.warn('hutao-skin: style dispose failed', e) }
      console.log('hutao-skin: 皮肤已卸载（UI 与素材路由已移除）。如需彻底删除插件记录，请对 AI 说：cordis_undefine <插件ID>')
    }

    function HutaoWidget() {
      // 素材地址：默认占位图（或 client-standalone 的内嵌壁纸）；
      // 若加载了 host.js 全画质模式，自动切换为 /hutao-skin/ 路由素材。
      const [assets, setAssets] = React.useState({ walls: WALLS.map((w) => w.uri), burst: BURST_DATA_URI })
      const [wallIndex, setWallIndex] = React.useState(0)
      const [cardH, setCardH] = React.useState(() => cardHeightFor(WALLS[0].aspect))
      const [failedWalls, setFailedWalls] = React.useState({})
      const [bursting, setBursting] = React.useState(false)
      const [burstKey, setBurstKey] = React.useState(0)
      const [hidden, setHidden] = React.useState(false)
      const [menu, setMenu] = React.useState(null)
      const [confirmUninstall, setConfirmUninstall] = React.useState(false)
      const [pos, setPos] = React.useState(() => ({
        x: Math.max(8, window.innerWidth - 360),
        y: Math.max(8, window.innerHeight - 620),
      }))
      const posRef = React.useRef(pos)
      posRef.current = pos
      const audioRef = React.useRef(null)
      const movedRef = React.useRef(false)

      React.useEffect(() => {
        const protocol = window.location.protocol
        if (protocol !== 'http:' && protocol !== 'https:') return
        host.call('hutao-urls', null).then((r) => {
          if (r && Array.isArray(r.walls) && r.walls.length >= 3 && typeof r.burst === 'string') {
            const origin = window.location.origin
            setAssets({
              walls: r.walls.map((u) => origin + u),
              burst: origin + r.burst,
            })
          }
        }).catch(() => {})
      }, [])

      React.useEffect(() => () => {
        if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
      }, [])

      const triggerBurst = () => {
        setBurstKey((k) => k + 1)
        setBursting(true)
        try {
          if (typeof assets.burst !== 'string') {
            console.warn('hutao-skin: 未检测到 host.js 语音路由，跳过语音（动画照常）')
            return
          }
          if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
          const audio = new Audio(assets.burst)
          audioRef.current = audio
          const playing = audio.play()
          if (playing !== undefined && playing.catch) playing.catch((err) => console.warn('hutao-skin: voice play failed', err))
        } catch (err) {
          console.error('hutao-skin: audio failed', err)
        }
      }

      const onPointerDown = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        movedRef.current = false
        const startX = e.clientX
        const startY = e.clientY
        const startPos = posRef.current
        const move = (ev) => {
          const dx = ev.clientX - startX
          const dy = ev.clientY - startY
          if (Math.abs(dx) + Math.abs(dy) > 6) movedRef.current = true
          setPos({
            x: Math.max(-180, Math.min(window.innerWidth - 90, startPos.x + dx)),
            y: Math.max(-180, Math.min(window.innerHeight - 90, startPos.y + dy)),
          })
        }
        const up = () => {
          window.removeEventListener('pointermove', move)
          window.removeEventListener('pointerup', up)
        }
        window.addEventListener('pointermove', move)
        window.addEventListener('pointerup', up)
      }

      const openMenu = (e, mode) => {
        e.preventDefault()
        e.stopPropagation()
        setConfirmUninstall(false)
        setMenu({
          x: Math.min(e.clientX, window.innerWidth - 240),
          y: Math.min(e.clientY, window.innerHeight - 260),
          mode,
        })
      }

      const menuItem = (label, onClick, danger) => React.createElement('div', {
        className: 'hutao-menu-item' + (danger ? ' danger' : ''),
        onClick: (e) => { e.stopPropagation(); onClick() },
      }, label)

      const menuLabel = (label) => React.createElement('div', {
        key: 'label-' + label,
        className: 'hutao-menu-label',
        onClick: (e) => e.stopPropagation(),
      }, label)

      const renderMenu = () => {
        if (menu === null) return null
        const items = []
        if (menu.mode === 'card') {
          items.push(menuItem('释放元素爆发「安神秘法」', () => { setMenu(null); triggerBurst() }))
          items.push(menuLabel('切换壁纸'))
          for (let i = 0; i < WALLS.length; i++) {
            const idx = i
            items.push(menuItem(WALLS[i].name + (wallIndex === i ? ' ✓' : ''), () => {
              setMenu(null)
              setWallIndex(idx)
              setCardH(cardHeightFor(WALLS[idx].aspect))
              setFailedWalls((prev) => {
                const next = Object.assign({}, prev)
                delete next[idx]
                return next
              })
            }))
          }
          items.push(menuItem('收起皮肤', () => { setMenu(null); setHidden(true) }))
        } else {
          items.push(menuItem('显示皮肤', () => { setMenu(null); setHidden(false) }))
        }
        items.push(React.createElement('div', { key: 'sep', className: 'hutao-menu-sep' }))
        items.push(menuItem(
          confirmUninstall ? '再次点击：确认卸载' : '一键卸载',
          () => {
            if (confirmUninstall) { setMenu(null); uninstallAll() }
            else setConfirmUninstall(true)
          },
          true,
        ))
        return React.createElement('div', {
          className: 'hutao-menu-backdrop',
          onClick: () => setMenu(null),
          onContextMenu: (e) => { e.preventDefault(); setMenu(null) },
        },
          React.createElement('div', { className: 'hutao-menu', style: { left: menu.x, top: menu.y }, onClick: (e) => e.stopPropagation() }, items))
      }

      const pill = React.createElement('button', {
        className: 'hutao-pill',
        style: { left: pos.x, top: pos.y },
        onPointerDown: onPointerDown,
        onClick: () => setHidden(false),
        onContextMenu: (e) => openMenu(e, 'pill'),
        title: '胡桃皮肤（右键菜单）',
      }, '胡桃 ✦')

      const burstLayer = bursting
        ? React.createElement('div', { className: 'hutao-burst', key: 'burst-' + burstKey },
            React.createElement('div', { className: 'hutao-flash' }),
            React.createElement('div', { className: 'hutao-bloom' }),
            React.createElement('div', { className: 'hutao-shock' }),
            React.createElement('div', { className: 'hutao-slash hutao-slash-1' }),
            React.createElement('div', { className: 'hutao-slash hutao-slash-2' }),
            React.createElement('div', { className: 'hutao-slash hutao-slash-3' }),
            React.createElement('div', { className: 'hutao-stars' },
              Array.from({ length: STAR_COUNT }, (_, i) => React.createElement('span', {
                key: 'star-' + i,
                className: 'hutao-star',
                style: {
                  '--dx': ((i % 5) - 2) * 84 + ((i * 11) % 17) - 8 + 'px',
                  '--dy': ((Math.floor(i / 5) % 2) === 0 ? -1 : 1) * (90 + (i % 4) * 22) + 'px',
                  animationDelay: (i % 5) * 0.04 + 's',
                },
              }), '✦')),
            React.createElement('div', { className: 'hutao-shards' },
              Array.from({ length: PARTICLE_COUNT }, (_, i) => React.createElement('span', {
                key: i,
                className: 'hutao-shard',
                style: {
                  '--dx': ((i % 5) - 2) * 100 + ((i * 13) % 19) - 9 + 'px',
                  '--dy': ((Math.floor(i / 5) % 3) - 1) * 118 - 70 + 'px',
                  animationDelay: (i % 4) * 0.03 + 's',
                },
              }))),
            React.createElement('div', { className: 'hutao-skill' }, SKILL_TEXT),
            React.createElement('div', { className: 'hutao-line', onAnimationEnd: () => setBursting(false) }, '“' + VOICE_TEXT + '”'),
          )
        : null

      const card = React.createElement('div', {
        className: 'hutao-root',
        style: { left: pos.x, top: pos.y },
        onPointerDown: onPointerDown,
      },
        React.createElement('div', {
          className: 'hutao-card' + (bursting ? ' hutao-is-bursting' : ''),
          style: { width: CARD_W, height: cardH },
          onClick: () => { if (!movedRef.current) triggerBurst() },
          onContextMenu: (e) => openMenu(e, 'card'),
          title: '点击：释放元素爆发「安神秘法」；右键：菜单（当前壁纸：' + WALLS[wallIndex].name + '）',
        },
          React.createElement('img', {
            className: 'hutao-img',
            src: assets.walls[wallIndex],
            draggable: false,
            alt: '胡桃',
            onLoad: (e) => {
              const el = e.currentTarget
              if (el.naturalWidth > 0) setCardH(cardHeightFor(el.naturalHeight / el.naturalWidth))
            },
            onError: () => setFailedWalls((prev) => {
              const next = Object.assign({}, prev)
              next[wallIndex] = true
              return next
            }),
          }),
          burstLayer,
          failedWalls[wallIndex]
            ? React.createElement('div', { className: 'hutao-warn', title: '当前壁纸加载失败' }, '⚠')
            : null,
          React.createElement('button', {
            className: 'hutao-close',
            title: '收起皮肤',
            onClick: (e) => { e.stopPropagation(); setHidden(true) },
          }, '×'),
        ))

      return React.createElement(React.Fragment, null, hidden ? pill : card, renderMenu())
    }

    slots.inject('shell.overlay', () => {
      disposeSlot = slots.register(
        { name: 'shell.overlay', id: 'hutao-skin-widget', order: 100, label: '胡桃动态皮肤' },
        () => React.createElement(HutaoWidget),
      )
      return disposeSlot
    })
  },
}
