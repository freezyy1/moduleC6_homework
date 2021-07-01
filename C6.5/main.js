const btn = document.querySelector('.btn');
function params(){
    let a = window.innerWidth
    let b = window.innerHeight
    let c = []
    c.push(a)
    c.push(b)
    return c
}

btn.addEventListener( "click" , () =>
    alert(params()));

