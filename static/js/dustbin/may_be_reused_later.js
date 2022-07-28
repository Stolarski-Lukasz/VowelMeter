// // this was Pfitzinger's model
// function draw_vq () { 
//   c.beginPath(); // initializes a new line drawing
//   c.moveTo(100, 100); 
//   c.lineTo(712, 100);
//   c.lineTo(712, 600);
//   c.lineTo(350, 600);
//   c.lineTo(100, 100);
//   c.moveTo(183, 266); 
//   c.lineTo(712, 266);
//   c.moveTo(266, 433);
//   c.lineTo(712, 433);
//   c.moveTo(406, 100);
//   c.lineTo(531, 600);
//   // accepts any css color declaration...
//   // use it each time you want to change color to a new one
//   c.strokeStyle = 'black';
//   c.lineWidth = 2;
//   c.stroke(); 
// };



//UPLOADING FILES START
///////////////////////

//// voice profile upload
//const profile_file = document.getElementById("profile_file");
//const profile_select_button = document.getElementById("profile_select_button");
//const profile_submit_button = document.getElementById("profile_submit_button");
//const profile_status_text = document.getElementById("profile_status_text");
//
//
//profile_select_button.addEventListener("click", function() {
//  profile_file.click();
//});
//
//profile_file.addEventListener("change", function() {
//  if (profile_file.value) {
//    let file_name = profile_file.value.match(
//      /[\/\\]([\w\d\s\.\-\(\)]+)$/
//    )[1];
//    console.log(file_name);
//    if (file_name.slice(-4) == '.wav') {
//      let final_profile_status_text = 'seleted ' + file_name;
//      profile_status_text.innerHTML = final_profile_status_text;
//      profile_submit_button.disabled = false;
//      profile_submit_button.style.backgroundColor = '#639d38';
//      profile_submit_button.style.cursor = 'pointer';
//    }
//    else {
//      let final_profile_status_text = 'wrong file type: choose "wav" or "mp3" file';
//      profile_status_text.innerHTML = final_profile_status_text;
//    };
//  } 
//  else {
//    profile_status_text.innerHTML = "no file selected";
//  };
//});




//// Vowel Type checkboxes functionality START
//////////////////////////////////////////////
//
//// grabbing the parent element of the checkboxes
//const vowel_type_container = document.getElementById('vowel_type_container');
//
//// adding the click event listener to the whole section with checkboxes
//vowel_type_container.addEventListener('click', function (e) {
//
//  if (e.target.type == 'checkbox') {
//
//    // obtaining all checkboxes for the parent element
//    let grandparent_element = e.target.parentElement.parentElement;
//    let series_labels = grandparent_element.querySelectorAll('input');
//    
//    let checkbox_number = 0;
//    series_labels.forEach(function (checkbox) {
//      if (e.target != checkbox) {
//        checkbox.checked = false;
//      }
//    })
//
//    // checking 'all' if all checkeboxes become unchecked
//    let check_state_array = [];
//    series_labels.forEach(function (checkbox) {
//      check_state_array.push(checkbox.checked);
//    })
//
//    // when nothing becomes chekced, check "all"
//    if (check_state_array.includes(true) == false) {
//      series_labels[0].checked = true;
//    }
//  }
//});
//
//// Vowel Type checkboxes functionality START
//////////////////////////////////////////////

