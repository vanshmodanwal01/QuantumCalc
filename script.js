// ================== CALCULATOR LOGIC ==================
function toRad(x) {
    return x * Math.PI / 180;
}

function factorial(n) {
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    return res;
}

function calculateExpression(expr) {
    try {
        expr = expr.replace(/pi/g, Math.PI);
        expr = expr.replace(/e/g, Math.E);

        expr = expr.replace(/\^/g, "**");

        expr = expr.replace(/sin\((.*?)\)/g, (_, x) => Math.sin(toRad(eval(x))));
        expr = expr.replace(/cos\((.*?)\)/g, (_, x) => Math.cos(toRad(eval(x))));
        expr = expr.replace(/tan\((.*?)\)/g, (_, x) => Math.tan(toRad(eval(x))));

        expr = expr.replace(/log\((.*?)\)/g, (_, x) => Math.log10(eval(x)));
        expr = expr.replace(/ln\((.*?)\)/g, (_, x) => Math.log(eval(x)));
        expr = expr.replace(/sqrt\((.*?)\)/g, (_, x) => Math.sqrt(eval(x)));

        expr = expr.replace(/(\d+)!/g, (_, x) => factorial(Number(x)));

        return eval(expr);
    }
    catch {
        return "Error";
    }
}

// Handle calculator button
document.addEventListener("DOMContentLoaded", () => {
    let calcButton = document.getElementById("calculate");
    if (calcButton) {
        calcButton.onclick = () => {
            let expr = document.getElementById("expression").value;
            let result = calculateExpression(expr);

            document.getElementById("result").innerText = result;
            document.getElementById("history").innerHTML += `<div>${expr} = ${result}</div>`;
        };
    }
});

// ================== FEATURE POPUP DATA ==================
const featureDetails = {
    trigo: {
        title: "Trigonometric Functions",
        desc: "Includes sin(x), cos(x), tan(x) with automatic degree-to-radian conversion()(PI and e are constants,not in Rad)."
    },
    log: {
        title: "Logarithmic Operations",
        desc: "Supports log (base-10) and natural log (ln)."
    },
    fact: {
        title: "Factorial Support",
        desc: "Supports factorial calculations using n!(It will overflow after 170!)."
    },
    power: {
        title: "Square Root & Power",
        desc: "Supports sqrt(x), x^y and other math power operations(Any other expression for sqrt will not be applicable)."
    },
    const: {
        title: "Constants (pi, e)",
        desc: "Provides mathematical constants like π and Euler's number (e)."
    },
    history: {
        title: "History Recall System",
        desc: "Automatically stores previous calculations for quick access."
    },
    Error: {
        title: "Avoid Errors",
        desc: "Avoid illogical Combinations,Division by zero will show INFINITY."
    }
};

// ================== POPUP LOGIC ==================
document.querySelectorAll(".feature-box").forEach(box => {
    box.addEventListener("click", () => {
        const key = box.getAttribute("data-feature");

        document.getElementById("featureTitle").innerText = featureDetails[key].title;
        document.getElementById("featureDescription").innerText = featureDetails[key].desc;

        document.getElementById("featureModal").style.display = "flex";
    });
});

document.getElementById("closeModal").onclick = () => {
    document.getElementById("featureModal").style.display = "none";
};

window.onclick = (e) => {
    if (e.target === document.getElementById("featureModal")) {
        document.getElementById("featureModal").style.display = "none";
    }
};
