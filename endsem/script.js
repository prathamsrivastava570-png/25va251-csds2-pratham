function calculateSum() {
    let n = parseInt(document.getElementById("num").value);
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    document.getElementById("result").innerHTML =
        "Sum = " + sum;
}