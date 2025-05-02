// const confirmBtn=document.querySelector(".confirmBtn");

// console.dir(confirmBtn);
// confirmBtn.addEventListener("click",openSameTab=()=>{
//     console.log("huhu");
//    // window.location.href = "second.html";
//     const userValue =document.querySelector("#username").value;
//     console.log(userValue);
//     const passValue=document.querySelector("#password").value;
//     console.log(passValue);
//     //window.location.href = 'second.html?username=' + encodeURIComponent(username);
//     const heading=document.querySelector(".heading");
//     console.log(heading)
// });

// For index.html
const usernameInput = document.querySelector('#username');
const submitBtn = document.querySelector('.confirmBtn');

if (submitBtn && usernameInput) {
  submitBtn.addEventListener('click', function() {
    const username = usernameInput.value.trim();
    if (username) {
      window.location.href = 'second.html?username=' + encodeURIComponent(username);
    } else {
      alert('Please enter your username!');
    }
  });
}

// For second.html
const welcomeMessage = document.querySelector('.heading');

if (welcomeMessage) {
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');
  
  if (username) {
    welcomeMessage.innerText = ` ${username}!`;
  } else {
    welcomeMessage.innerText = "No username found.";
  }
}
const input = document.getElementById('user-photo');
  const previewContainer = document.getElementById('preview-container');
  // const removeBtn = document.getElementById('remove-btn');

  function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewContainer.innerHTML = `<img src="${e.target.result}" alt="User Photo">`;
      // removeBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  }

  input.addEventListener('change', function () {
    const file = this.files[0];
    if (file && file.type.startsWith('image/')) {
      previewImage(file);
    } else {
      alert("Please select a valid image file.");
      input.value = '';
      previewContainer.innerHTML = '<span>No image selected</span>';
      // removeBtn.style.display = 'none';
    }
  });

  // removeBtn.addEventListener('click', function () {
  //   photoInput.value = ""; // reset file input
  //   preview.src = "#";
  //   preview.style.display = "none";
  //   removeBtn.style.display = "none";
  // });

  // document.getElementById('user-form').addEventListener('submit', function (e) {
  //   if (!input.files[0]) {
  //     e.preventDefault();
  //     alert("Please upload a photo before submitting.");
  //   }
  // });


  const fileInput = document.getElementById('fee-reciept');
  const fileInfo = document.getElementById('fileInfo');
  // const removeFeeBtn = document.getElementById('removefee-btn');

  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      fileInfo.textContent = `Selected File: ${file.name}`;
      removeFeeBtn.style.display = 'inline-block';
      fileInput.style.display = 'none';
    }
  });

  // removeFeeBtn.addEventListener('click', function () {
  //   fileInput.value = '';
  //   fileInfo.textContent = '';
  //   removeBtn.style.display = 'none';
  //   fileInput.style.display = 'inline-block';
  // });

   // Initialize signature pad
   const canvas = document.getElementById('student-signature');
   const signaturePad = new SignaturePad(canvas, {
     backgroundColor: 'rgba(255, 255, 255, 0)',
     penColor: 'black'
   });

   // Resize canvas properly
   function resizeCanvas() {
     const ratio = Math.max(window.devicePixelRatio || 1, 1);
     canvas.width = canvas.offsetWidth * ratio;
     canvas.height = canvas.offsetHeight * ratio;
     canvas.getContext("2d").scale(ratio, ratio);
     signaturePad.clear(); // Clear after resize
   }

   window.addEventListener("resize", resizeCanvas);
   resizeCanvas();

   // Save and submit
   const form = document.getElementById("approvalForm");
  //  form.addEventListener("submit", function(event) {
  //    if (signaturePad.isEmpty()) {
  //      alert("Please sign before submitting.");
  //      event.preventDefault();
  //      return;
  //    }
     const dataURL = signaturePad.toDataURL();
     document.getElementById("studentSignature").value = dataURL;
     //alert("Signature saved and form ready for submission.");
   //});