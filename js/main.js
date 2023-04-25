jQuery(document).ready(function($){
		var rut_dv = '';
		var rut = '';
		//function for rut validation
		function check_rut(raw_rut,rut_dv) {
		  var rut = raw_rut.replace(/\./g,"");
		  rut_dv = rut_dv.toLocaleLowerCase();
		  // revisar tipo
		  if (!rut || !rut.length || typeof rut !== 'string') {
			return -1;
		  }
		  // serie numerica
		  var secuencia = [2,3,4,5,6,7,2,3];
		  var sum = 0;
		  //
		  for (var i=rut.length - 1; i >=0; i--) {
			var d = rut.charAt(i)
			sum += new Number(d)*secuencia[rut.length - (i + 1)];
		  };
		  // sum mod 11
		  var rest = 11 - (sum % 11);
		  var dv = rest === 11 ? 0 : rest === 10 ? "k" : rest;
		  dv = String(dv);
		  return dv === rut_dv;
		}
		

	//Validation Form
  //add method for validate rut input
$.validator.addMethod('rut_dv', function (value, element, param) {
	//Your Validation Here
	if($(element).val() != '' && $('#rut').val() != ''){
	  var rut_string = $('#rut').val();//rut numbet. here we can filter the string or in check_rut(see *replace)
		var rut_dv = $(element).val();//verification digit
	  var responseRut = check_rut(rut_string, rut_dv);//we call check_rut function for rut validation
	  if(responseRut){
	    return true; // return bool here if valid or not.
	  }else{
	  	return false;
	  }
	}else{
	}
}, '*');

		   //set the messages errors to show, if in 'validate' function, there isnt setting for message, will show selector attr for message errors.
    $.extend($.validator.messages, {
        remote: "Please fix this field.",
        email: "Ingrese un mail válido.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Ingrese un número válido",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Ingrese un numero menor o igual a {0}."),
        min: $.validator.format("Ingrese un numero mayor o igual a {0}."),
    });
	jQuery.validator.addMethod('lettersonly', function(value, element) {
    return this.optional(element) || /^[a-z áãâäàéêëèíîïìóõôöòúûüùç]+$/i.test(value);
}, "Letters and spaces only please"); 
			//validation
			//@agree foo checkbox
			//ruv_dv:set true for trigger rut validation
			$("#formulario").validate({
		      ignore: [],
			  rules: {
		        rut:{
		          number:false,
		          maxlength:8,
		          minlength:7,
		          required:true
		        },
		        rut_dv:{
		        	number:false,
		        	maxlength:1,
		        	minlength:1,
		        	rut_dv:true,
		        	required:true
		        },
		        firstname:{
		        	required:true,
		          number:false,
		          lettersonly: true,
		          minlength:2
		        },
		        lastname:{
		        	required:true,
		          number:false,
		          lettersonly: true,
		          minlength:2
		        },
		        email:{
		        	required:true,
		          email:true
		        },
		        boleta:{
		        	required:true,
		          number:true,
		        },
		        agree:'required'
		     
		      },
			    errorPlacement:function(error, element) {
		     			if($(element).is(':checkbox')){
		     				$('.required2').css('display','block');
		     			}else{
              	$(element).val($(element).attr('data-message-error')).css('color','#c1272c');
              }
              $(element).focus(function(){
              	if($(this).hasClass('error')){
              		$(this).css('border-color','').val('');
              	}
              });

            },
          focusCleanup: false,
			    onsubmit: true,
			    focusInvalid: false,
			    onkeyup: false,
			    onfocusout: false


		   });

    	//END VALIDATION FORM
});
