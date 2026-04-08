(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
        var form = document.getElementById("loginForm");
        if (!form) return;

        var wrapper = form.closest(".cmp-loginForm");
        var errorEl = wrapper ? wrapper.querySelector(".cmp-loginForm__error") : null;
        var submitBtn = form.querySelector(".cmp-loginForm__submit");

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            var username = form.querySelector("[name='j_username']").value;
            var password = form.querySelector("[name='j_password']").value;
            var resource = form.querySelector("[name='resource']").value;

            if (!username || !password) {
                showError("Please enter both username and password.");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "Signing in...";

            var body = "j_username=" + encodeURIComponent(username)
                     + "&j_password=" + encodeURIComponent(password)
                     + "&j_validate=true";

            fetch("/j_security_check", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body,
                credentials: "same-origin"
            }).then(function(response) {
                if (response.ok) {
                    window.location.href = resource || "/";
                } else if (response.status === 403) {
                    showError("Invalid username or password.");
                    resetButton();
                } else {
                    showError("An unexpected error occurred. Please try again.");
                    resetButton();
                }
            }).catch(function() {
                showError("Network error. Please check your connection and try again.");
                resetButton();
            });
        });

        function showError(msg) {
            if (!errorEl) {
                errorEl = document.createElement("div");
                errorEl.className = "cmp-loginForm__error";
                form.parentNode.insertBefore(errorEl, form);
            }
            errorEl.textContent = msg;
            errorEl.style.display = "block";
        }

        function resetButton() {
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign In";
        }
    });
})();
