var BUTTON_INSERT_DIV = "fbxPhotoSetPageHeaderByline";
var button = insert_custom_button_into_page();
button.addEventListener("click", show_photos_for_copy);

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
    document.body.appendChild(photos_el);

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
	
	html_src += "<div style='height: 100px; width: 100px; overflow:hidden; display:inline;'><a target='_blank' href='" + image_src +"'><img height='100' src='" +thumb_src+"'/></a></div>";
    }
    return html_src;
}

function generate_perma_photos_el(html_text){

    var div = document.createElement('div');
    div.id = "fb-thumbs";
    div.innerHTML = html_text;
    return div;
}

function send_mailgun_mail(){
    var API_TOKEN = "";
    var url = "";
}
