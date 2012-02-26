var BUTTON_INSERT_DIV = "fbxPhotoSetPageHeaderByline";
var button = insert_custom_button_into_page();
insert_lightbox_into_page();

button.addEventListener("click", show_photos_for_copy);


function insert_lightbox_into_page(){
    var outer_div = document.createElement('div');
    var light_div = document.createElement('div');
    var dark_div = document.createElement('div');

    light_div.id = "light";
    light_div.setAttribute('class', 'white_content');
    
    dark_div.id = "fade";
    dark_div.setAttribute('class', 'black_overlay');
    
    outer_div.appendChild(light_div);
    outer_div.appendChild(dark_div);
    document.body.appendChild(outer_div);
}

function insert_custom_button_into_page(){
    var button = create_button('copy-fb-button', 'Prepare photo album for copying');
    insert_element_into_unique_class(BUTTON_INSERT_DIV, button);
    return button;
}

function create_button(id, text){
    var button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.style.cursor = "pointer";
    // button.setAttribute('onclick', 'show_photos_for_copy();');
    return button;
}


function insert_element_into_unique_class(class_name, to_insert_el){
    var el = document.getElementsByClassName(class_name)[0];
    console.log(class_name);
    console.log(el);
    insert_element_into_element(el, to_insert_el);
}

function insert_element_into_element(parent_el, to_insert_el){
    parent_el.appendChild(to_insert_el);
}

function show_photos_for_copy(){
    var html = generate_perma_photos_html();
    var photos_el = generate_perma_photos_el(html);
    var lightbox_el = document.getElementById('light');

    lightbox_el.appendChild(photos_el);

    // bind select all toggle
    document.getElementById('select-all-toggle').addEventListener("click", toggle_select_all)
    // end
    toggle_select_all();

    show_lightbox();
}

function toggle_select_all(){
    var select_str = document.getElementById('select-all').textContent;
    var select_form = document.getElementById('photos-form');

    var select_form_list = select_form.photo;
    if (select_str == 'Select'){
	for (var i=0; i<select_form_list.length; i++){
	    select_form_list[i].checked = true;
	}
	document.getElementById('select-all').textContent = 'Deselect';
    }
    else{
	// else it should be 'Deselect'	
	for (var i=0; i<select_form_list.length; i++){
	    select_form_list[i].checked = false;
	}
	document.getElementById('select-all').textContent = 'Select';
    }
}

function show_lightbox(){
    document.getElementById('light').style.display='block';
    var fade = document.getElementById('fade');
    fade.style.display='block';

    fade.addEventListener("click", hide_lightbox);
}

function hide_lightbox(){
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
}

function generate_perma_photos_html(){
    var html_src = "";
    
    var a_images = document.getElementsByClassName('uiScrollableThumb')
    for (var i=0; i< a_images.length; i++){
	// do something with all the a tag images
	// console.log(a_images[i]);
	var a_image = a_images[i];
	var ajaxify_str = a_image.getAttribute('ajaxify');
	var decoded_ajax_str = decodeURIComponent(ajaxify_str);
	var match_arr = decoded_ajax_str.match(/src=(.*)&theater/i);
	var image_src = match_arr[1];
	
	var thumb_i = a_image.getElementsByTagName('i')[0];
	var thumb_bg_style = thumb_i.style.background;
	var thumb_match_arr = thumb_bg_style.match(/url\((.*)\)/i);
	var thumb_src = thumb_match_arr[1];
	
	if (thumb_src.match(/\images\/spacer\.gif/i)){
	    // in case the thumbnails dont load... figure out secret sauce
	    // and load by self lulz
	    thumb_src = image_src.replace("_n.jpg", "_a.jpg");
	}

	html_src += "<div><a style='margin: 5px 5px 5px 5px; float:left; height: 100px; width: 100px; overflow:hidden; position:relative; border: 1px solid black;' target='_blank' href='" + image_src +"'><img style='position:absolute; float:left;' width='145' src='" +thumb_src+"'/><input style='position:absolute;' type='checkbox' name='photo' value='"+thumb_src+"'/></a></div>";
    }
    return html_src;
}

function generate_perma_photos_el(html_text){

    var form_div = document.createElement('form');
    var submit = create_button('submit', 'submit');
    var email_span = document.createElement('div');
    var email_input = document.createElement('input');
    var select_all_span = document.createElement('span');

    // set email input
    email_input.setAttribute('name', 'email');
    email_input.setAttribute('type', 'text');
    email_input.id='email-input';
    email_span.innerHTML = "Email photos to: ";
    email_span.appendChild(email_input);

    // set select all span
    select_all_span.style.cursor = 'pointer';
    select_all_span.id = "select-all-toggle";
    select_all_span.innerHTML = "<a>(<span id='select-all'>Select</span> all photos)</a>";

    form_div.setAttribute('target', '_blank');
    form_div.setAttribute('action', 'http://weavetogether.com/form/test');
    form_div.setAttribute('method', 'post');
    form_div.setAttribute('onsubmit',"return (!document.getElementById('email-input').value=='')");
    form_div.id = "photos-form";

    // append stuf to form
    email_span.appendChild(submit);
    form_div.appendChild(email_span);
    form_div.appendChild(select_all_span);
    // form_div.appendChild(submit);

    var div = document.createElement('div');
    div.id = "fb-thumbs";
    var msg = "Try highlighting all the photos and copy/pasting into an email!<br>";
    msg = "";
    div.innerHTML = msg+html_text;
    form_div.appendChild(div);
    return form_div;
}

function check_photos_form(){ 
    if(document.getElementById('email-input').value==''){
	console.log('here');
	return false;
    }
    else{
	return true;
    }  
}

function send_mailgun_mail(){
    var API_TOKEN = "";
    var url = "";
}
