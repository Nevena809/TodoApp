const userName = document.getElementById("user_name");
const userMessage = document.getElementById("user_message");

// function add(e) {
//     let text = res.value;
//     document.getElementById("results").innerHTML = text;
//   console.log(e);
// }

document.getElementById("button").addEventListener("click", function (e) {
  e.preventDefault();
  let userNameText = userName.value;
  let userMessageText = userMessage.value;

  document.getElementById("name_results").innerHTML += userNameText;
  userName.value = "";
  document.getElementById("message_results").innerHTML += userMessageText;
  userMessage.value = "";
});
