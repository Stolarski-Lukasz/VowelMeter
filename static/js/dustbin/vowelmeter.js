import { create_element, remove_element } from "./module_elements.js"

//general variables declarations
var image_download_button = document.getElementById('image_download_button');
var image_download = document.getElementById('image_download');


// HELPER FUNCTIONS START
/////////////////////////
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

function draw_vq_with_dot (backness, height) {  
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath(); // initializes a new line drawing
  c.moveTo(100, 100); 
  c.lineTo(712, 100);
  c.lineTo(712, 600);
  c.lineTo(350, 600);
  c.lineTo(100, 100);
  c.moveTo(183, 266); 
  c.lineTo(712, 266);
  c.moveTo(266, 433);
  c.lineTo(712, 433);
  c.moveTo(406, 100);
  c.lineTo(531, 600);
  // accepts any css color declaration...
  // use it each time you want to change color to a new one
  c.strokeStyle = 'black';
  c.lineWidth = 2;
  c.stroke();
  
  c.beginPath();
  // x, y, radius, beginning gradient, ending gradient - I do not know what these gradients are - may be checked leter, stroke direction (if true, they counter clock-wise)
  c.fillStyle = 'black';
  var adjusted_backness = (backness * 50) + 100;
  var adjusted_height = 600 - (height * 50);
  c.arc(adjusted_backness, adjusted_height, 10, 0, Math.PI *2, false);
  c.fill(); // for cicles, this additional command neccessary for filling...
  c.strokeStyle = 'black';
  c.stroke();
};

function draw_vq () { 
  c.beginPath(); // initializes a new line drawing
  c.moveTo(100, 100); 
  c.lineTo(712, 100);
  c.lineTo(712, 600);
  c.lineTo(350, 600);
  c.lineTo(100, 100);
  c.moveTo(183, 266); 
  c.lineTo(712, 266);
  c.moveTo(266, 433);
  c.lineTo(712, 433);
  c.moveTo(406, 100);
  c.lineTo(531, 600);
  // accepts any css color declaration...
  // use it each time you want to change color to a new one
  c.strokeStyle = 'black';
  c.lineWidth = 2;
  c.stroke(); 
};
// HELPER FUNCTIONS ENDED
/////////////////////////


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


//// VOWEL UPLOAD AND DRAWING VQ START
//////////////////////////////////////
const vowel_file = document.getElementById("vowel_file");
const vowel_select_button = document.getElementById("vowel_select_button");
const vowel_submit_button = document.getElementById("vowel_submit_button");
const vowel_status_text = document.getElementById("vowel_status_text");
const results_info = document.getElementById("results_info");
let file_name = "";


vowel_select_button.addEventListener("click", function() {
  vowel_file.click();
});

vowel_file.addEventListener("change", function() {
  if (vowel_file.value) {
    file_name = vowel_file.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
    console.log(file_name);
    if (file_name.slice(-4) == '.wav' || file_name.slice(-4) == '.mp3') {
      let final_vowel_status_text = 'Status: seleted ' + file_name;
      vowel_status_text.innerHTML = final_vowel_status_text;
      vowel_submit_button.className = "btn btn-success";
      vowel_submit_button.disabled = false;
      vowel_submit_button.style.cursor = 'pointer';
    }
    else {
      let final_vowel_status_text = 'wrong file type: choose "wav" or "mp3" file';
      vowel_status_text.innerHTML = final_vowel_status_text;
    };
  } 
  else {
    vowel_status_text.innerHTML = "no file selected";
  };
});



vowel_submit_button.addEventListener('click', function (e) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // obtaining the json response
      remove_element("the_spinner");
      let json_response = xhr.responseText;
      // transforming the json response to js object
      let response_object = JSON.parse(json_response);
      let f0_mean = response_object.f0_mean;
      console.log(f0_mean);
      let f1_mean = response_object.f1_mean;
      console.log(f1_mean);
      let f2_mean = response_object.f2_mean;
      console.log(f2_mean);
      let backness = response_object.backness;
      console.log(backness);
      let height = response_object.height;
      console.log(height);
      draw_vq_with_dot(backness, height);
      results_info.innerHTML = "";
      create_element({tag: "p", className: "results_paragraph", innerText: "Acoustic measurements: ", parent_id: "results_info"});
      create_element({tag: "p", className: "results_paragraph", innerText: "Mean F0: " + parseFloat(f0_mean).toFixed(2) + " Hz", parent_id: "results_info"});
      create_element({tag: "p", className: "results_paragraph", innerText: "Mean F1: " + parseFloat(f1_mean).toFixed(2) + " Hz", parent_id: "results_info"});
      create_element({tag: "p", className: "results_paragraph", innerText: "Mean F2: " + parseFloat(f2_mean).toFixed(2) + " Hz", parent_id: "results_info"});
      create_element({tag: "br", parent_id: "results_info"});
      create_element({tag: "p", className: "results_paragraph", innerText: "Vowel diagram coordinates: ", parent_id: "results_info"});
      create_element({tag: "p", className: "results_paragraph", innerText: "x = " + parseFloat(backness).toFixed(2) + ", y = " + parseFloat(height).toFixed(2), parent_id: "results_info"});
      image_download_button.style.cursor = 'pointer';
      image_download_button.className = "btn btn-success";
      image_download_button.disabled = false;
      vowel_status_text.innerHTML = "Status: showing " + file_name;
    };
  };
  
  var file = vowel_file.files[0];
  var formData = new FormData();
  formData.append('file', file);
  create_element({tag: "div", className: "spinner-border spinner-border-sm text-primary", role: "status", id: "the_spinner", parent_id: "vowel_submit_button", style_marginLeft: "1em"});
  
  xhr.open('POST', '/get_vq_coordinates/', true);
// here xhr.setTrquestHeader is missing - it's probably not obligatory, but probably better to place here something...
  xhr.send(formData);
  
});
//// VOWEL UPLOAD AND DRAWING VQ ENDED
//////////////////////////////////////



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



// image download button functionality START
////////////////////////////////////////////
image_download.addEventListener('click', function (e) {
    console.log("clicked");
    var dataURL = canvas.toDataURL('image/png');
    image_download.href = dataURL;
});
// image download button functionality ENDED
////////////////////////////////////////////


draw_vq();


// // plotly - first example
// /////////////////////////
// Plotly.d3.csv('http://localhost:8000/static/datasets/male_normal.csv', function(err, rows){

//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     }

//     var data = [{
//         x: unpack(rows, 'x'),
//         y: unpack(rows, 'y'),
//         z: unpack(rows, 'z'),
//         mode: 'markers',
//         type: 'scatter3d',
//         marker: {
//           color: 'rgb(40, 167, 69)',
//           size: 3
//         }
//     },{
//         alphahull: 7,
//         opacity: 0.1,
//         type: 'mesh3d',
//         color: 'rgb(182, 182, 182)',
//         x: unpack(rows, 'x'),
//         y: unpack(rows, 'y'),
//         z: unpack(rows, 'z')
//     }];

//     var layout = {
//         autosize: true,
//         height: 800,
//         scene: {
//             aspectratio: {
//                 x: 1,
//                 y: 1,
//                 z: 1
//             },
//             camera: {
//                 center: {
//                     x: 0,
//                     y: 0,
//                     z: 0
//                 },
//                 eye: {
//                     x: 1.25,
//                     y: 1.25,
//                     z: 1.25
//                 },
//                 up: {
//                     x: 0,
//                     y: 0,
//                     z: 1
//                 }
//             },
//             xaxis: {
//                 type: 'linear',
//                 zeroline: false
//             },
//             yaxis: {
//                 type: 'linear',
//                 zeroline: false
//             },
//             zaxis: {
//                 type: 'linear',
//                 zeroline: false
//             }
//         },
//         title: '3d point clustering',
//         width: 800
//     };

//     Plotly.newPlot('myDiv', data, layout);

// });


// // plotly - second example
// //////////////////////////

// let trace1 = {
//   mode: 'markers', 
//   name: 'Iris-setosa', 
//   type: 'scatter3d', 
//   x: [5.1, 4.9, 4.7, 4.6, 5.0, 5.4, 4.6, 5.0, 4.4, 4.9, 5.4, 4.8, 4.8, 4.3, 5.8, 5.7, 5.4, 5.1, 5.7, 5.1, 5.4, 5.1, 4.6, 5.1, 4.8, 5.0, 5.0, 5.2, 5.2, 4.7, 4.8, 5.4, 5.2, 5.5, 4.9, 5.0, 5.5, 4.9, 4.4, 5.1, 5.0, 4.5, 4.4, 5.0, 5.1, 4.8, 5.1, 4.6, 5.3, 5.0], 
//   y: [3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.1, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3], 
//   z: [1.4, 1.4, 1.3, 1.5, 1.4, 1.7, 1.4, 1.5, 1.4, 1.5, 1.5, 1.6, 1.4, 1.1, 1.2, 1.5, 1.3, 1.4, 1.7, 1.5, 1.7, 1.5, 1.0, 1.7, 1.9, 1.6, 1.6, 1.5, 1.4, 1.6, 1.6, 1.5, 1.5, 1.4, 1.5, 1.2, 1.3, 1.5, 1.3, 1.5, 1.3, 1.3, 1.3, 1.6, 1.9, 1.4, 1.6, 1.4, 1.5, 1.4], 
//   marker: {
//     line: {width: 0}, 
//     size: 3, 
//     color: 'rgb(228,26,28)'
//   }
// };
// let trace2 = {
//   mode: 'markers', 
//   name: 'Iris-versicolor', 
//   type: 'scatter3d', 
//   x: [7.0, 6.4, 6.9, 5.5, 6.5, 5.7, 6.3, 4.9, 6.6, 5.2, 5.0, 5.9, 6.0, 6.1, 5.6, 6.7, 5.6, 5.8, 6.2, 5.6, 5.9, 6.1, 6.3, 6.1, 6.4, 6.6, 6.8, 6.7, 6.0, 5.7, 5.5, 5.5, 5.8, 6.0, 5.4, 6.0, 6.7, 6.3, 5.6, 5.5, 5.5, 6.1, 5.8, 5.0, 5.6, 5.7, 5.7, 6.2, 5.1, 5.7], 
//   y: [3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8], 
//   z: [4.7, 4.5, 4.9, 4.0, 4.6, 4.5, 4.7, 3.3, 4.6, 3.9, 3.5, 4.2, 4.0, 4.7, 3.6, 4.4, 4.5, 4.1, 4.5, 3.9, 4.8, 4.0, 4.9, 4.7, 4.3, 4.4, 4.8, 5.0, 4.5, 3.5, 3.8, 3.7, 3.9, 5.1, 4.5, 4.5, 4.7, 4.4, 4.1, 4.0, 4.4, 4.6, 4.0, 3.3, 4.2, 4.2, 4.2, 4.3, 3.0, 4.1], 
//   marker: {
//     line: {width: 0}, 
//     size: 3, 
//     color: 'rgb(55,126,184)'
//   }
// };
// let trace3 = {
//   mode: 'markers', 
//   name: 'Iris-virginica', 
//   type: 'scatter3d', 
//   x: [6.3, 5.8, 7.1, 6.3, 6.5, 7.6, 4.9, 7.3, 6.7, 7.2, 6.5, 6.4, 6.8, 5.7, 5.8, 6.4, 6.5, 7.7, 7.7, 6.0, 6.9, 5.6, 7.7, 6.3, 6.7, 7.2, 6.2, 6.1, 6.4, 7.2, 7.4, 7.9, 6.4, 6.3, 6.1, 7.7, 6.3, 6.4, 6.0, 6.9, 6.7, 6.9, 5.8, 6.8, 6.7, 6.7, 6.3, 6.5, 6.2, 5.9], 
//   y: [3.3, 2.7, 3.0, 2.9, 3.0, 3.0, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3.0, 2.5, 2.8, 3.2, 3.0, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3.0, 2.8, 3.0, 2.8, 3.8, 2.8, 2.8, 2.6, 3.0, 3.4, 3.1, 3.0, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3.0, 2.5, 3.0, 3.4, 3.0], 
//   z: [6.0, 5.1, 5.9, 5.6, 5.8, 6.6, 4.5, 6.3, 5.8, 6.1, 5.1, 5.3, 5.5, 5.0, 5.1, 5.3, 5.5, 6.7, 6.9, 5.0, 5.7, 4.9, 6.7, 4.9, 5.7, 6.0, 4.8, 4.9, 5.6, 5.8, 6.1, 6.4, 5.6, 5.1, 5.6, 6.1, 5.6, 5.5, 4.8, 5.4, 5.6, 5.1, 5.1, 5.9, 5.7, 5.2, 5.0, 5.2, 5.4, 5.1], 
//   marker: {
//     line: {width: 0}, 
//     size: 3, 
//     color: 'rgb(77,175,74)'
//   }
// };
// let data = [trace1, trace2, trace3];
// let layout = {
//   scene: {
//     xaxis: {
//       title: 'Sepal Length', 
//       gridcolor: 'rgb(255, 255, 255)', 
//       titlefont: {
//         size: 14, 
//         color: '#2f2f2f', 
//         family: 'Courier New'
//       }, 
//       zerolinecolor: 'rgb(255, 255, 255)', 
//       showbackground: true, 
//       backgroundcolor: 'rgb(230, 230,230)'
//     }, 
//     yaxis: {
//       title: 'Sepal Width', 
//       gridcolor: 'rgb(255, 255, 255)', 
//       titlefont: {
//         size: 14, 
//         color: '#4f4f4f', 
//         family: 'Courier New'
//       }, 
//       zerolinecolor: 'rgb(255, 255, 255)', 
//       showbackground: true, 
//       backgroundcolor: 'rgb(230, 230,230)'
//     }, 
//     zaxis: {
//       title: 'Petal Length', 
//       gridcolor: 'rgb(255, 255, 255)', 
//       titlefont: {
//         size: 14, 
//         color: '#7f7f7f', 
//         family: 'Courier New'
//       }, 
//       zerolinecolor: 'rgb(255, 255, 255)', 
//       showbackground: true, 
//       backgroundcolor: 'rgb(230, 230,230)'
//     }, 
//     aspectmode: 'manual', 
//     aspectratio: {
//       x: 1, 
//       y: 1, 
//       z: 1
//     }
//   }, 
//   title: 'Iris dataset', 
//   width: 800, 
//   height: 550, 
//   autosize: false
// };
// Plotly.plot('myDiv', {
//   data: data,
//   layout: layout
// });


// saarland 3 vowels
/////////////////////
// Plotly.d3.csv('http://localhost:8000/static/datasets/all_plotly.csv', function(err, rows){
  
//   console.log(rows);
//   function unpack(rows, key) {
//       return rows.map(function(row) { return row[key]; });
//     };

//   let a_x = unpack(rows, 'a_x');
//   let a_y = unpack(rows, 'a_y');
//   let a_z = unpack(rows, 'a_z');
//   let i_x = unpack(rows, 'i_x');
//   let i_y = unpack(rows, 'i_y');
//   let i_z = unpack(rows, 'i_z');
//   let u_x = unpack(rows, 'u_x');
//   let u_y = unpack(rows, 'u_y');
//   let u_z = unpack(rows, 'u_z');

//   let trace1 = {
//     mode: 'markers', 
//     name: 'a', 
//     type: 'scatter3d', 
//     x: a_x, 
//     y: a_y, 
//     z: a_z, 
//     marker: {
//       line: {width: 0}, 
//       size: 3, 
//       color: 'rgb(228,26,28)'
//     }
//   };
//   let trace2 = {
//     mode: 'markers', 
//     name: 'i', 
//     type: 'scatter3d', 
//     x: i_x, 
//     y: i_y, 
//     z: i_z, 
//     marker: {
//       line: {width: 0}, 
//       size: 3, 
//       color: 'rgb(55,126,184)'
//     }
//   };
//   let trace3 = {
//     mode: 'markers', 
//     name: 'u', 
//     type: 'scatter3d', 
//     x: u_x, 
//     y: u_y, 
//     z: u_z, 
//     marker: {
//       line: {width: 0}, 
//       size: 3, 
//       color: 'rgb(40, 167, 69)'
//     }
//   };
//   let trace4 = {
//     alphahull: 7,
//     opacity: 0.1,
//     type: 'mesh3d',
//     color: 'rgb(182, 182, 182)',
//     x: a_x,
//     y: a_y,
//     z: a_z
//   };
//   let trace5 = {
//     alphahull: 7,
//     opacity: 0.1,
//     type: 'mesh3d',
//     color: 'rgb(182, 182, 182)',
//     x: i_x,
//     y: i_y,
//     z: i_z
//   };
//   let trace6 = {
//     alphahull: 7,
//     opacity: 0.1,
//     type: 'mesh3d',
//     color: 'rgb(182, 182, 182)',
//     x: u_x,
//     y: u_y,
//     z: u_z
//   };
//   let data = [trace1, trace2, trace3];
//   let layout = {
//     scene: {
//       xaxis: {
//         title: 'log(F3/F2)', 
//         gridcolor: 'rgb(255, 255, 255)', 
//         titlefont: {
//           size: 14, 
//           color: '#2f2f2f', 
//           family: 'Courier New'
//         }, 
//         zerolinecolor: 'rgb(255, 255, 255)', 
//         showbackground: true, 
//         backgroundcolor: 'rgb(230, 230,230)'
//       }, 
//       yaxis: {
//         title: 'log(F1/SR)', 
//         gridcolor: 'rgb(255, 255, 255)', 
//         titlefont: {
//           size: 14, 
//           color: '#4f4f4f', 
//           family: 'Courier New'
//         }, 
//         zerolinecolor: 'rgb(255, 255, 255)', 
//         showbackground: true, 
//         backgroundcolor: 'rgb(230, 230,230)'
//       }, 
//       zaxis: {
//         title: 'log(F2/F1)', 
//         gridcolor: 'rgb(255, 255, 255)', 
//         titlefont: {
//           size: 14, 
//           color: '#7f7f7f', 
//           family: 'Courier New'
//         }, 
//         zerolinecolor: 'rgb(255, 255, 255)', 
//         showbackground: true, 
//         backgroundcolor: 'rgb(230, 230,230)'
//       }, 
//       aspectmode: 'manual', 
//       aspectratio: {
//         x: 1, 
//         y: 1, 
//         z: 1
//       }
//     }, 
//     title: 'Three German Vowels', 
//     width: 1000, 
//     height: 1000, 
//     autosize: false
//   };
//   Plotly.plot('myDiv', {
//     data: data,
//     layout: layout
//   });

// });

let my_colors = ["red", "green", "yellow", "blue", "orange", "purple", "olive", "aqua", "maroon", "fuchsia", "lime", "grey"]

// primary cardinal vowels
//////////////////////////
Plotly.d3.csv('http://localhost:8000/static/datasets/pcv_plotly_manual.csv', function(err, rows){
  
  console.log(rows);
  function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    };

  let cv_1_x = unpack(rows, 'cv_1_x');
  let cv_1_y = unpack(rows, 'cv_1_y');
  let cv_1_z = unpack(rows, 'cv_1_z');
  let cv_2_x = unpack(rows, 'cv_2_x');
  let cv_2_y = unpack(rows, 'cv_2_y');
  let cv_2_z = unpack(rows, 'cv_2_z');
  let cv_3_x = unpack(rows, 'cv_3_x');
  let cv_3_y = unpack(rows, 'cv_3_y');
  let cv_3_z = unpack(rows, 'cv_3_z');
  let cv_4_x = unpack(rows, 'cv_4_x');
  let cv_4_y = unpack(rows, 'cv_4_y');
  let cv_4_z = unpack(rows, 'cv_4_z');
  let cv_5_x = unpack(rows, 'cv_5_x');
  let cv_5_y = unpack(rows, 'cv_5_y');
  let cv_5_z = unpack(rows, 'cv_5_z');
  let cv_6_x = unpack(rows, 'cv_6_x');
  let cv_6_y = unpack(rows, 'cv_6_y');
  let cv_6_z = unpack(rows, 'cv_6_z');
  let cv_7_x = unpack(rows, 'cv_7_x');
  let cv_7_y = unpack(rows, 'cv_7_y');
  let cv_7_z = unpack(rows, 'cv_7_z');
  let cv_8_x = unpack(rows, 'cv_8_x');
  let cv_8_y = unpack(rows, 'cv_8_y');
  let cv_8_z = unpack(rows, 'cv_8_z');
  let cv_9_x = unpack(rows, 'cv_9_x');
  let cv_9_y = unpack(rows, 'cv_9_y');
  let cv_9_z = unpack(rows, 'cv_9_z');
  let cv_10_x = unpack(rows, 'cv_10_x');
  let cv_10_y = unpack(rows, 'cv_10_y');
  let cv_10_z = unpack(rows, 'cv_10_z');
  let cv_11_x = unpack(rows, 'cv_11_x');
  let cv_11_y = unpack(rows, 'cv_11_y');
  let cv_11_z = unpack(rows, 'cv_11_z');
  let cv_12_x = unpack(rows, 'cv_12_x');
  let cv_12_y = unpack(rows, 'cv_12_y');
  let cv_12_z = unpack(rows, 'cv_12_z');
  let cv_13_x = unpack(rows, 'cv_13_x');
  let cv_13_y = unpack(rows, 'cv_13_y');
  let cv_13_z = unpack(rows, 'cv_13_z');
  let cv_14_x = unpack(rows, 'cv_14_x');
  let cv_14_y = unpack(rows, 'cv_14_y');
  let cv_14_z = unpack(rows, 'cv_14_z');
  let cv_15_x = unpack(rows, 'cv_15_x');
  let cv_15_y = unpack(rows, 'cv_15_y');
  let cv_15_z = unpack(rows, 'cv_15_z');
  let cv_16_x = unpack(rows, 'cv_16_x');
  let cv_16_y = unpack(rows, 'cv_16_y');
  let cv_16_z = unpack(rows, 'cv_16_z');
  let cv_17_x = unpack(rows, 'cv_17_x');
  let cv_17_y = unpack(rows, 'cv_17_y');
  let cv_17_z = unpack(rows, 'cv_17_z');
  let cv_18_x = unpack(rows, 'cv_18_x');
  let cv_18_y = unpack(rows, 'cv_18_y');
  let cv_18_z = unpack(rows, 'cv_18_z');
  let cv_19_x = unpack(rows, 'cv_19_x');
  let cv_19_y = unpack(rows, 'cv_19_y');
  let cv_19_z = unpack(rows, 'cv_19_z');
  let cv_20_x = unpack(rows, 'cv_20_x');
  let cv_20_y = unpack(rows, 'cv_20_y');
  let cv_20_z = unpack(rows, 'cv_20_z');
  let cv_21_x = unpack(rows, 'cv_21_x');
  let cv_21_y = unpack(rows, 'cv_21_y');
  let cv_21_z = unpack(rows, 'cv_21_z');
  let cv_22_x = unpack(rows, 'cv_22_x');
  let cv_22_y = unpack(rows, 'cv_22_y');
  let cv_22_z = unpack(rows, 'cv_22z');
  let cv_23_x = unpack(rows, 'cv_23_x');
  let cv_23_y = unpack(rows, 'cv_23_y');
  let cv_23_z = unpack(rows, 'cv_23_z');
  let cv_24_x = unpack(rows, 'cv_24_x');
  let cv_24_y = unpack(rows, 'cv_24_y');
  let cv_24_z = unpack(rows, 'cv_24_z');
  let cv_25_x = unpack(rows, 'cv_25_x');
  let cv_25_y = unpack(rows, 'cv_25_y');
  let cv_25_z = unpack(rows, 'cv_25_z');
  let cv_26_x = unpack(rows, 'cv_26_x');
  let cv_26_y = unpack(rows, 'cv_26_y');
  let cv_26z = unpack(rows, 'cv_26_z');
  let cv_27_x = unpack(rows, 'cv_27_x');
  let cv_27_y = unpack(rows, 'cv_27_y');
  let cv_27_z = unpack(rows, 'cv_27_z');
  let cv_28_x = unpack(rows, 'cv_28_x');
  let cv_28_y = unpack(rows, 'cv_28_y');
  let cv_28_z = unpack(rows, 'cv_28_z');


  let cv_1_x_mean = unpack(rows, 'cv_1_x_mean');
  let cv_1_y_mean = unpack(rows, 'cv_1_y_mean');
  let cv_1_z_mean = unpack(rows, 'cv_1_z_mean');
  let cv_2_x_mean = unpack(rows, 'cv_2_x_mean');
  let cv_2_y_mean = unpack(rows, 'cv_2_y_mean');
  let cv_2_z_mean = unpack(rows, 'cv_2_z_mean');
  let cv_3_x_mean = unpack(rows, 'cv_3_x_mean');
  let cv_3_y_mean = unpack(rows, 'cv_3_y_mean');
  let cv_3_z_mean = unpack(rows, 'cv_3_z_mean');
  let cv_4_x_mean = unpack(rows, 'cv_4_x_mean');
  let cv_4_y_mean = unpack(rows, 'cv_4_y_mean');
  let cv_4_z_mean = unpack(rows, 'cv_4_z_mean');
  let cv_5_x_mean = unpack(rows, 'cv_5_x_mean');
  let cv_5_y_mean = unpack(rows, 'cv_5_y_mean');
  let cv_5_z_mean = unpack(rows, 'cv_5_z_mean');
  let cv_6_x_mean = unpack(rows, 'cv_6_x_mean');
  let cv_6_y_mean = unpack(rows, 'cv_6_y_mean');
  let cv_6_z_mean = unpack(rows, 'cv_6_z_mean');
  let cv_7_x_mean = unpack(rows, 'cv_7_x_mean');
  let cv_7_y_mean = unpack(rows, 'cv_7_y_mean');
  let cv_7_z_mean = unpack(rows, 'cv_7_z_mean');
  let cv_8_x_mean = unpack(rows, 'cv_8_x_mean');
  let cv_8_y_mean = unpack(rows, 'cv_8_y_mean');
  let cv_8_z_mean = unpack(rows, 'cv_8_z_mean');
  let cv_9_x_mean = unpack(rows, 'cv_9_x_mean');
  let cv_9_y_mean = unpack(rows, 'cv_9_y_mean');
  let cv_9_z_mean = unpack(rows, 'cv_9_z_mean');
  let cv_10_x_mean = unpack(rows, 'cv_10_x_mean');
  let cv_10_y_mean = unpack(rows, 'cv_10_y_mean');
  let cv_10_z_mean = unpack(rows, 'cv_10_z_mean');
  let cv_11_x_mean = unpack(rows, 'cv_11_x_mean');
  let cv_11_y_mean = unpack(rows, 'cv_11_y_mean');
  let cv_11_z_mean = unpack(rows, 'cv_11_z_mean');
  let cv_12_x_mean = unpack(rows, 'cv_12_x_mean');
  let cv_12_y_mean = unpack(rows, 'cv_12_y_mean');
  let cv_12_z_mean = unpack(rows, 'cv_12_z_mean');
  let cv_13_x_mean = unpack(rows, 'cv_13_x_mean');
  let cv_13_y_mean = unpack(rows, 'cv_13_y_mean');
  let cv_13_z_mean = unpack(rows, 'cv_13_z_mean');
  let cv_14_x_mean = unpack(rows, 'cv_14_x_mean');
  let cv_14_y_mean = unpack(rows, 'cv_14_y_mean');
  let cv_14_z_mean = unpack(rows, 'cv_14_z_mean');
  let cv_15_x_mean = unpack(rows, 'cv_15_x_mean');
  let cv_15_y_mean = unpack(rows, 'cv_15_y_mean');
  let cv_15_z_mean = unpack(rows, 'cv_15_z_mean');
  let cv_16_x_mean = unpack(rows, 'cv_16_x_mean');
  let cv_16_y_mean = unpack(rows, 'cv_16_y_mean');
  let cv_16_z_mean = unpack(rows, 'cv_16_z_mean');
  let cv_17_x_mean = unpack(rows, 'cv_17_x_mean');
  let cv_17_y_mean = unpack(rows, 'cv_17_y_mean');
  let cv_17_z_mean = unpack(rows, 'cv_17_z_mean');
  let cv_18_x_mean = unpack(rows, 'cv_18_x_mean');
  let cv_18_y_mean = unpack(rows, 'cv_18_y_mean');
  let cv_18_z_mean = unpack(rows, 'cv_18_z_mean');
  let cv_19_x_mean = unpack(rows, 'cv_19_x_mean');
  let cv_19_y_mean = unpack(rows, 'cv_19_y_mean');
  let cv_19_z_mean = unpack(rows, 'cv_19_z_mean');
  let cv_20_x_mean = unpack(rows, 'cv_20_x_mean');
  let cv_20_y_mean = unpack(rows, 'cv_20_y_mean');
  let cv_20_z_mean = unpack(rows, 'cv_20_z_mean');
  let cv_21_x_mean = unpack(rows, 'cv_21_x_mean');
  let cv_21_y_mean = unpack(rows, 'cv_21_y_mean');
  let cv_21_z_mean = unpack(rows, 'cv_21_z_mean');
  let cv_22_x_mean = unpack(rows, 'cv_22_x_mean');
  let cv_22_y_mean = unpack(rows, 'cv_22_y_mean');
  let cv_22_z_mean = unpack(rows, 'cv_22_z_mean');
  let cv_23_x_mean = unpack(rows, 'cv_23_x_mean');
  let cv_23_y_mean = unpack(rows, 'cv_23_y_mean');
  let cv_23_z_mean = unpack(rows, 'cv_23_z_mean');
  let cv_24_x_mean = unpack(rows, 'cv_24_x_mean');
  let cv_24_y_mean = unpack(rows, 'cv_24_y_mean');
  let cv_24_z_mean = unpack(rows, 'cv_24_z_mean');
  let cv_25_x_mean = unpack(rows, 'cv_25_x_mean');
  let cv_25_y_mean = unpack(rows, 'cv_25_y_mean');
  let cv_25_z_mean = unpack(rows, 'cv_25_z_mean');
  let cv_26_x_mean = unpack(rows, 'cv_26_x_mean');
  let cv_26_y_mean = unpack(rows, 'cv_26_y_mean');
  let cv_26_z_mean = unpack(rows, 'cv_26_z_mean');
  let cv_27_x_mean = unpack(rows, 'cv_27_x_mean');
  let cv_27_y_mean = unpack(rows, 'cv_27_y_mean');
  let cv_27_z_mean = unpack(rows, 'cv_27_z_mean');
  let cv_28_x_mean = unpack(rows, 'cv_28_x_mean');
  let cv_28_y_mean = unpack(rows, 'cv_28_y_mean');
  let cv_28_z_mean = unpack(rows, 'cv_28_z_mean');



  let cv_1_x_median = unpack(rows, 'cv_1_x_median');
  let cv_1_y_median = unpack(rows, 'cv_1_y_median');
  let cv_1_z_median = unpack(rows, 'cv_1_z_median');
  let cv_2_x_median = unpack(rows, 'cv_2_x_median');
  let cv_2_y_median = unpack(rows, 'cv_2_y_median');
  let cv_2_z_median = unpack(rows, 'cv_2_z_median');
  let cv_3_x_median = unpack(rows, 'cv_3_x_median');
  let cv_3_y_median = unpack(rows, 'cv_3_y_median');
  let cv_3_z_median = unpack(rows, 'cv_3_z_median');
  let cv_4_x_median = unpack(rows, 'cv_4_x_median');
  let cv_4_y_median = unpack(rows, 'cv_4_y_median');
  let cv_4_z_median = unpack(rows, 'cv_4_z_median');
  let cv_5_x_median = unpack(rows, 'cv_5_x_median');
  let cv_5_y_median = unpack(rows, 'cv_5_y_median');
  let cv_5_z_median = unpack(rows, 'cv_5_z_median');
  let cv_6_x_median = unpack(rows, 'cv_6_x_median');
  let cv_6_y_median = unpack(rows, 'cv_6_y_median');
  let cv_6_z_median = unpack(rows, 'cv_6_z_median');
  let cv_7_x_median = unpack(rows, 'cv_7_x_median');
  let cv_7_y_median = unpack(rows, 'cv_7_y_median');
  let cv_7_z_median = unpack(rows, 'cv_7_z_median');
  let cv_8_x_median = unpack(rows, 'cv_8_x_median');
  let cv_8_y_median = unpack(rows, 'cv_8_y_median');
  let cv_8_z_median = unpack(rows, 'cv_8_z_median');
  let cv_9_x_median = unpack(rows, 'cv_9_x_median');
  let cv_9_y_median = unpack(rows, 'cv_9_y_median');
  let cv_9_z_median = unpack(rows, 'cv_9_z_median');
  let cv_10_x_median = unpack(rows, 'cv_10_x_median');
  let cv_10_y_median = unpack(rows, 'cv_10_y_median');
  let cv_10_z_median = unpack(rows, 'cv_10_z_median');
  let cv_11_x_median = unpack(rows, 'cv_11_x_median');
  let cv_11_y_median = unpack(rows, 'cv_11_y_median');
  let cv_11_z_median = unpack(rows, 'cv_11_z_median');
  let cv_12_x_median = unpack(rows, 'cv_12_x_median');
  let cv_12_y_median = unpack(rows, 'cv_12_y_median');
  let cv_12_z_median = unpack(rows, 'cv_12_z_median');
  let cv_13_x_median = unpack(rows, 'cv_13_x_median');
  let cv_13_y_median = unpack(rows, 'cv_13_y_median');
  let cv_13_z_median = unpack(rows, 'cv_13_z_median');
  let cv_14_x_median = unpack(rows, 'cv_14_x_median');
  let cv_14_y_median = unpack(rows, 'cv_14_y_median');
  let cv_14_z_median = unpack(rows, 'cv_14_z_median');
  let cv_15_x_median = unpack(rows, 'cv_15_x_median');
  let cv_15_y_median = unpack(rows, 'cv_15_y_median');
  let cv_15_z_median = unpack(rows, 'cv_15_z_median');
  let cv_16_x_median = unpack(rows, 'cv_16_x_median');
  let cv_16_y_median = unpack(rows, 'cv_16_y_median');
  let cv_16_z_median = unpack(rows, 'cv_16_z_median');
  let cv_17_x_median = unpack(rows, 'cv_17_x_median');
  let cv_17_y_median = unpack(rows, 'cv_17_y_median');
  let cv_17_z_median = unpack(rows, 'cv_17_z_median');
  let cv_18_x_median = unpack(rows, 'cv_18_x_median');
  let cv_18_y_median = unpack(rows, 'cv_18_y_median');
  let cv_18_z_median = unpack(rows, 'cv_18_z_median');
  let cv_19_x_median = unpack(rows, 'cv_19_x_median');
  let cv_19_y_median = unpack(rows, 'cv_19_y_median');
  let cv_19_z_median = unpack(rows, 'cv_19_z_median');
  let cv_20_x_median = unpack(rows, 'cv_20_x_median');
  let cv_20_y_median = unpack(rows, 'cv_20_y_median');
  let cv_20_z_median = unpack(rows, 'cv_20_z_median');
  let cv_21_x_median = unpack(rows, 'cv_21_x_median');
  let cv_21_y_median = unpack(rows, 'cv_21_y_median');
  let cv_21_z_median = unpack(rows, 'cv_21_z_median');
  let cv_22_x_median = unpack(rows, 'cv_22_x_median');
  let cv_22_y_median = unpack(rows, 'cv_22_y_median');
  let cv_22_z_median = unpack(rows, 'cv_22_z_median');
  let cv_23_x_median = unpack(rows, 'cv_23_x_median');
  let cv_23_y_median = unpack(rows, 'cv_23_y_median');
  let cv_23_z_median = unpack(rows, 'cv_23_z_median');
  let cv_24_x_median = unpack(rows, 'cv_24_x_median');
  let cv_24_y_median = unpack(rows, 'cv_24_y_median');
  let cv_24_z_median = unpack(rows, 'cv_24_z_median');
  let cv_25_x_median = unpack(rows, 'cv_25_x_median');
  let cv_25_y_median = unpack(rows, 'cv_25_y_median');
  let cv_25_z_median = unpack(rows, 'cv_25_z_median');
  let cv_26_x_median = unpack(rows, 'cv_26_x_median');
  let cv_26_y_median = unpack(rows, 'cv_26_y_median');
  let cv_26_z_median = unpack(rows, 'cv_26_z_median');
  let cv_27_x_median = unpack(rows, 'cv_27_x_median');
  let cv_27_y_median = unpack(rows, 'cv_27_y_median');
  let cv_27_z_median = unpack(rows, 'cv_27_z_median');
  let cv_28_x_median = unpack(rows, 'cv_28_x_median');
  let cv_28_y_median = unpack(rows, 'cv_28_y_median');
  let cv_28_z_median = unpack(rows, 'cv_28_z_median');

  let trace1 = {
    mode: 'markers', 
    name: 'cv_1', 
    type: 'scatter3d',
    x: cv_1_x, 
    y: cv_1_y, 
    z: cv_1_z,
    marker: {
      line: {width: 0}, 
      size: 5,
      color: "darksalmon"
    }
  };
  let trace1_mean = {
    mode: 'markers', 
    name: 'cv_1_centroid', 
    type: 'scatter3d',
    x: cv_1_x_mean, 
    y: cv_1_y_mean, 
    z: cv_1_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace1_median = {
    mode: 'markers', 
    name: 'cv_1_centroid', 
    type: 'scatter3d',
    x: cv_1_x_median, 
    y: cv_1_y_median, 
    z: cv_1_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace2 = {
    mode: 'markers', 
    name: 'cv_2', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_2_x, 
    y: cv_2_y, 
    z: cv_2_z, 
    marker: {
      line: {width: 0}, 
      size: 5,
    }
  };
  let trace2_mean = {
    mode: 'markers', 
    name: 'cv_2_centroid', 
    type: 'scatter3d',
    colorscale: "Earth",  
    x: cv_2_x_mean, 
    y: cv_2_y_mean, 
    z: cv_2_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace2_median = {
    mode: 'markers', 
    name: 'cv_2_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_2_x_median, 
    y: cv_2_y_median, 
    z: cv_2_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace3 = {
    mode: 'markers', 
    name: 'cv_3', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_3_x, 
    y: cv_3_y, 
    z: cv_3_z, 
    marker: {
      line: {width: 0}, 
      size: 5
    }
  };
  let trace3_mean = {
    mode: 'markers', 
    name: 'cv_3_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_3_x_mean, 
    y: cv_3_y_mean, 
    z: cv_3_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace3_median = {
    mode: 'markers', 
    name: 'cv_3_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_3_x_median, 
    y: cv_3_y_median, 
    z: cv_3_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace4 = {
    mode: 'markers', 
    name: 'cv_4', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_4_x, 
    y: cv_4_y, 
    z: cv_4_z, 
    marker: {
      line: {width: 0}, 
      size: 5
    }
  };
  let trace4_mean = {
    mode: 'markers', 
    name: 'cv_4_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_4_x_mean, 
    y: cv_4_y_mean, 
    z: cv_4_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace4_median = {
    mode: 'markers', 
    name: 'cv_4_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_4_x_median, 
    y: cv_4_y_median, 
    z: cv_4_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace5 = {
    mode: 'markers', 
    name: 'cv_5', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_5_x, 
    y: cv_5_y, 
    z: cv_5_z, 
    marker: {
      line: {width: 0}, 
      size: 5
    }
  };
  let trace5_mean = {
    mode: 'markers', 
    name: 'cv_5_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_5_x_mean, 
    y: cv_5_y_mean, 
    z: cv_5_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace5_median = {
    mode: 'markers', 
    name: 'cv_5_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_5_x_median, 
    y: cv_5_y_median, 
    z: cv_5_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace6 = {
    mode: 'markers', 
    name: 'cv_6', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_6_x, 
    y: cv_6_y, 
    z: cv_6_z, 
    marker: {
      line: {width: 0}, 
      size: 5
    }
  };
  let trace6_mean = {
    mode: 'markers', 
    name: 'cv_6_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_6_x_mean, 
    y: cv_6_y_mean, 
    z: cv_6_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace6_median = {
    mode: 'markers', 
    name: 'cv_6_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_6_x_median, 
    y: cv_6_y_median, 
    z: cv_6_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace7 = {
    mode: 'markers', 
    name: 'cv_7', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_7_x, 
    y: cv_7_y, 
    z: cv_7_z, 
    marker: {
      line: {width: 0}, 
      size: 5
    }
  };
  let trace7_mean = {
    mode: 'markers', 
    name: 'cv_7_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_7_x_mean, 
    y: cv_7_y_mean, 
    z: cv_7_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace7_median = {
    mode: 'markers', 
    name: 'cv_7_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_7_x_median, 
    y: cv_7_y_median, 
    z: cv_7_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace8 = {
    mode: 'markers', 
    name: 'cv_8', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_8_x, 
    y: cv_8_y, 
    z: cv_8_z, 
    marker: {
      line: {width: 0}, 
      size: 5
    }
  };
  let trace8_mean = {
    mode: 'markers', 
    name: 'cv_8_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_8_x_mean, 
    y: cv_8_y_mean, 
    z: cv_8_z_mean, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  let trace8_median = {
    mode: 'markers', 
    name: 'cv_8_centroid', 
    type: 'scatter3d', 
    colorscale: "Earth", 
    x: cv_8_x_median, 
    y: cv_8_y_median, 
    z: cv_8_z_median, 
    marker: {
      line: {width: 0}, 
      size: 10, 
      symbol: "cross"
    }
  };
  // let trace9 = {
  //   mode: 'markers', 
  //   name: 'cv_9', 
  //   type: 'scatter3d', 
  //   x: cv_9_x, 
  //   y: cv_9_y, 
  //   z: cv_9_z, 
  //   marker: {
  //     line: {width: 0}, 
  //     size: 5, 
  //     color: 'teal'
  //   }
  // };
  // let trace9_mean = {
  //   mode: 'markers', 
  //   name: 'cv_9_centroid', 
  //   type: 'scatter3d', 
  //   x: cv_9_x_mean, 
  //   y: cv_9_y_mean, 
  //   z: cv_9_z_mean, 
  //   marker: {
  //     line: {width: 0}, 
  //     size: 10, 
  //     symbol: "cross",
  //     color: 'teal'
  //   }
  // };
  // let trace9_median = {
  //   mode: 'markers', 
  //   name: 'cv_9_centroid', 
  //   type: 'scatter3d', 
  //   x: cv_9_x_median, 
  //   y: cv_9_y_median, 
  //   z: cv_9_z_median, 
  //   marker: {
  //     line: {width: 0}, 
  //     size: 10, 
  //     symbol: "cross",
  //     color: 'teal'
  //   }
  // };
  // let trace10 = {
  //   mode: 'markers', 
  //   name: 'cv_9', 
  //   type: 'scatter3d', 
  //   x: cv_10_x, 
  //   y: cv_10_y, 
  //   z: cv_10_z, 
  //   marker: {
  //     line: {width: 0}, 
  //     size: 5, 
  //     color: 'teal'
  //   }
  // };
  // let trace10_mean = {
  //   mode: 'markers', 
  //   name: 'cv_9_centroid', 
  //   type: 'scatter3d', 
  //   x: cv_10_x_mean, 
  //   y: cv_10_y_mean, 
  //   z: cv_10_z_mean, 
  //   marker: {
  //     line: {width: 0}, 
  //     size: 10, 
  //     symbol: "cross",
  //     color: 'teal'
  //   }
  // };
  // let trace10_median = {
  //   mode: 'markers', 
  //   name: 'cv_9_centroid', 
  //   type: 'scatter3d', 
  //   x: cv_10_x_median, 
  //   y: cv_10_y_median, 
  //   z: cv_10_z_median, 
  //   marker: {
  //     line: {width: 0}, 
  //     size: 10, 
  //     symbol: "cross",
  //     color: 'teal'
  //   }
  // };




  let data = [trace1, trace1_mean, trace2, trace2_mean, trace3, trace3_mean, trace4, trace4_mean, trace5, trace5_mean, 
    trace6, trace6_mean, trace7, trace7_mean, trace8, trace8_mean];
  let layout = {
    scene: {
      xaxis: {
        title: 'log(F3/F2)', 
        gridcolor: 'rgb(255, 255, 255)', 
        titlefont: {
          size: 14, 
          color: '#2f2f2f', 
          family: 'Courier New'
        }, 
        zerolinecolor: 'rgb(255, 255, 255)', 
        showbackground: true, 
        backgroundcolor: 'rgb(230, 230,230)'
      }, 
      yaxis: {
        title: 'log(F1/SR)', 
        gridcolor: 'rgb(255, 255, 255)', 
        titlefont: {
          size: 14, 
          color: '#4f4f4f', 
          family: 'Courier New'
        }, 
        zerolinecolor: 'rgb(255, 255, 255)', 
        showbackground: true, 
        backgroundcolor: 'rgb(230, 230,230)'
      }, 
      zaxis: {
        title: 'log(F2/F1)', 
        gridcolor: 'rgb(255, 255, 255)', 
        titlefont: {
          size: 14, 
          color: '#7f7f7f', 
          family: 'Courier New'
        }, 
        zerolinecolor: 'rgb(255, 255, 255)', 
        showbackground: true, 
        backgroundcolor: 'rgb(230, 230,230)'
      }, 
      aspectmode: 'manual', 
      aspectratio: {
        x: 1, 
        y: 1, 
        z: 1
      }
    }, 
    title: 'Primary Cardinal Vowels', 
    width: 1000, 
    height: 1000, 
    autosize: false
  };
  Plotly.plot('myDiv', {
    data: data,
    layout: layout
  });

});