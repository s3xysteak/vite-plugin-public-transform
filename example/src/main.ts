import './style.css'

fetch('~p/msg.json')
  .then(res => res.json())
  .then((data) => {
    document.querySelector<HTMLHeadingElement>('#msg')!.innerHTML = data.msg
  })

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="@p/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <h2 id="msg"></h2>
  </div>
`
