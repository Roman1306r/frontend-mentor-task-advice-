const styleDocument = `* {margin: 0;padding: 0;border: 0; box-sizing: border-box;}
html, body { width: 100vw; height: 100vh;font-family: 'Montserrat', sans-serif;background-color: #333; color: white;display: flex;justify-content: center; align-items: center;}
.advice { background-color: #565656;padding: 40px;position: relative;font-size: 20px; border-radius: 20px;
text-align: center;box-shadow: 0px 0px 10px 40px #323236;max-width: 500px;padding-bottom: 70px;margin: 5px;}
.advice__number {color: #00ffff;letter-spacing: 3px;margin-bottom: 20px;}
.advice__lines { margin-top: 30px; display: block;font-weight: 900;letter-spacing: 5px;line-height: 10px;position: relative;}
.advice__lines::before, .advice__lines::after { content: '';height: 1px; width: 30%; top: 50%; transform: translate(0, -45%); z-index: 0;position: absolute; background-color: rgb(164, 164, 164);}
.advice__lines::before {left: 0;}.advice__lines::after {  right: 0; }.advice__kubik {display: block; width: 50px; height: 50px; position: absolute;left: 50%; bottom: 0; transform: translate(-50%, 50%); background-color:  #00ffff;border-radius: 50%;display: flex;justify-content: center;align-items: center; transition: all 0.3s ease 0s;cursor: pointer;}.advice__quote { font-weight: 600; font-size: 25px; display: block; margin: 60px 0;}.advice__kubik:hover {
 box-shadow: 0px 0px 5px 5px rgb(0, 117, 133);}.advice__kubik.active {animation: kubik 1s linear alternate;}
@keyframes kubik {  50%{transform: translate(-50%, 50%) rotate(360deg) scale(1.3);}}`




function init() {
    const body = document.body
    const head = document.head
    const style = document.createElement('style');
    style.insertAdjacentHTML('afterbegin', styleDocument )
    head.append(style)
    const containerApp = document.createElement('div');
    containerApp.className = 'advice';
    containerApp.insertAdjacentHTML("afterbegin",
     `<p class="advice__number">Advice # <span id="advice__id"></span></p>
     <q class="advice__quote"></q>
     <span class="advice__lines">||</span>
     <button class="advice__kubik"><img width="35" height="35" src="https://img.icons8.com/ios-filled/256/module.png" alt="kubik"></button>`)
     body.prepend(containerApp)
     getNewAdvice()
}
init()


async function getAdvice() {
    const url = 'https://api.adviceslip.com/advice'
    const responce = await fetch(url)
    const result = await responce.json()
    return result
}


function getNewAdvice() {
    const kubik = document.querySelector('.advice__kubik')
    const numberAdvice = document.getElementById('advice__id')
    const quote = document.querySelector('.advice__quote')
    kubik.classList.add('active')
    kubik.addEventListener('click', getNewAdvice )
    setTimeout(() => {
        try {
            getAdvice()
            .then(slip => slip.slip)
            .then(slip => {
                numberAdvice.innerHTML = slip.id 
                quote.innerHTML = slip.advice 
            }) 
            .catch(err => alert(err))
        } catch (err) {
            alert(err.message);
        } finally {
            kubik.classList.remove('active')
        } 
    }, 1500)  
}