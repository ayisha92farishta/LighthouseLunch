
$(document).ready(() => {

  $('#submitNewUser').on('submit', onSubmitNewUser);

});

const onSubmitNewUser = function() {

  const $name = $('#exampleInputName').val();
  const $email = $('#exampleInputEmail1').val();
  const $password = $('#exampleInputPassword1').val();
  const $phone = $('#exampleInputPhone').val();

  addUser();

};



  // $newUserForm.on('submit', function(event) {
  //   event.preventDefault();
  //   const nameBody = $('#exampleInputName').val();
  //   const emailBody = $('#exampleInputEmail1').val();
  //   const passwordBody = $('#exampleInputPassword1').val();
  //   const phoneBody = $('#exampleInputPhone').val();
  //   $('#exampleInputName').val("");
  //   $('#exampleInputEmail1').val("");
  //   $('#exampleInputPassword1').val("");
  //   $('#exampleInputPhone').val("");
  //     addUser();
  // });

  // window.$newUserForm = $newUserForm;
