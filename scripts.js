function selectActivate(selectElement) {
    const valueSelected = selectElement.value;
    const otherRoleInput = document.getElementById('role');

    if (valueSelected === "other") {
        otherRoleInput.style.display = "block";
        otherRoleInput.setAttribute("name", "role");
    } else {
        otherRoleInput.style.display = "none";
        otherRoleInput.removeAttribute("name");
        otherRoleInput.value = "";
    }
}

function submitFeedback(event) {
    event.preventDefault();
    const form = document.getElementById('feedback-form');
    const formData = new FormData(form);

    const roleSelect = form.querySelector('select');
    const roleInput = document.getElementById('role');
    if (roleSelect.value === 'other') {
        formData.append('role', roleInput.value);
    } else {
        formData.append('role', roleSelect.value);
    }

    fetch("https://formspree.io/f/myzgwagz", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('feedback-form').style.display = 'none';
            document.getElementById('thank-you').style.display = 'block';
        } else {
            return response.json().then(data => {
                if (data.errors) {
                    alert(data.errors.map(error => error.message).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            });
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        alert("Oops! There was a problem submitting your form");
    });
}

