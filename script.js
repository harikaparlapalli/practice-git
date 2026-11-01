document.getElementById("registrationForm").addEventListener("submit" , function(event) {
	event.preventDefault();
	
	const firstName = document.getElementById("first").value;
	const lastName = document.getElementById("last").value;
	const email = document.getElementById("email").value;
	const phone = document.getElementById("phone").value;
	const gender = document.getElementById("gender").value;
	const dob = document.getElementById("dob").value;
	const rollNum = document.getElementById("roll_num").value;
	const eventName = document.getElementById("event_name").value;

	const userData = {
		first_name : firstName,
		last_name :lastName,
		email : email,
		phone : phone,
		gender : gender,
		dob : dob,
		roll_num : rollNum,
		event_name : eventName
	};

	fetch("/register", {
		method: "POST",
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify(userData)
	})

	.then(response => response.json())
	.then(result => {
		document.getElementById("message").textContent = result.message;
	})

	.catch(error =>{
		console.error("Error:", error);
		document.getElementById("message").textContent = "Registration failed";
	});

});
