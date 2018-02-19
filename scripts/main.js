const levels = 15
nextLevel(0)
function nextLevel(actualLevel){
  let keys = generateKeys(levels)
  if (actualLevel == levels) {
    return swal(
      {
        title:'Ganaste!!',
        type:'success'
      }
    )
  }
  swal({
    timer:'1000',
    title:`Nivel ${actualLevel + 1}`,
    showConfirmButton : false
  })

  for(let i = 0; i<=actualLevel; i++){
    setTimeout(()=>{
      activate(keys[i])
      audio(keys[i])
    },1500 * (i+1))

  }
  let i = 0
  let actualKey = keys[i]
  window.addEventListener('keydown', onKeyDown)

  function onKeyDown(ev){
    if (ev.keyCode == actualKey) {
      activate(actualKey, {success:true})
      audio(actualKey)
      i++
      if(i>actualLevel){
        window.removeEventListener('keydown', onKeyDown)
        setTimeout(()=> nextLevel(i), 500)
      }
      actualKey = keys[i]
    }else {
      activate(ev.keyCode, {fail:true})
      audio(91)
      window.removeEventListener('keydown', onKeyDown)
      setTimeout(() => swal({
        title:'Tremendo Petauro',
        text:'Quieres jugar de nuevo?',
        showCancelButton : true,
        confirmButtonText :'Si',
        cancelButtonText : 'No',
        closeOnCancel:true
      },
      function(ok) {
        if (ok) {
          keys = generateKeys(levels)
          nextLevel(0)
        }window.removeEventListener('keydown', onKeyDown)
      }
    ), 1500)
    }
  }
}



function generateKeys(levels){
  return new Array(levels).fill(0).map(generateRandomKey)
}
function generateRandomKey(levels){
  const min = 65
  const max = 90
  return Math.round(Math.random()*(max-min) + min)
}
function getElementByKeyCode(keyCode){
  return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}){
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')
  if (opts.success) {
    el.classList.add('success')
  }else if (opts.fail) {
    el.classList.add('fail')
  }
  setTimeout(() => deactivate(el), 500)
}
function deactivate(el){
  el.className = 'key'
}


function audio(ev){

  let source = document.getElementById(ev)
  source.play()
}

