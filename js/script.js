var parent_element;
var current_element;

var create_input;
var read_input;
var update_input;
var delete_input;

var create_button;
var read_button;
var update_button;
var delete_button;

var ordered_list;
var read_array_of_colors;
var update_array_of_colors;

var list_elements_array;
var old_color;
var new_color;


var element_to_delete;

function add_element(element_name,element_id,element_parent){

    current_element = document.createElement(element_name);
    current_element.setAttribute('id',element_id);
    current_element.textContent = element_id;

    document.body.insertBefore(current_element,element_parent);
    
};


function add_multiple_elements(array_of_elements,array_of_element_ids){
        
        for(var i=0;i<array_of_elements.length;i++){
            
            current_element = document.createElement(array_of_elements[i]);
            current_element.setAttribute('id',array_of_element_ids[i]);
            current_element.addEventListener('focus',function(event){
                log_to_dom(this);
            });
            
            document.body.appendChild(current_element);
                        
        }
}


function crud_button_event(button_name,button_event,button_function){

    button_name.addEventListener(button_event,button_function);

}


function update_list_elements(){
    
    list_elements_array = document.getElementsByTagName('li');
    return list_elements_array;

};



function log_to_dom(message_to_log){
    console.log(message_to_log);
};





document.addEventListener('DOMContentLoaded',function(){

        //create the inputs for CRUD    
        add_multiple_elements(['input',
                               'input',
                               'input',
                               'input'
                              ],
                              ['create_input',
                               'read_input',
                               'update_input',
                               'delete_input'
                              ]
         );

        //create unordered list for storing the elements

        current_element = document.createElement('ol');
        current_element.setAttribute('id','ordered_list');
    
        document.body.appendChild(current_element);
        ordered_list = document.getElementById('ordered_list');

        //create the buttons for CRUD
        create_input = document.getElementById('create_input');
        create_input.setAttribute('placeholder','red');

    
        read_input = document.getElementById('read_input');
        read_input.setAttribute('placeholder','red,green,blue');
        
    
        update_input = document.getElementById('update_input'); 
        update_input.setAttribute('placeholder','old_color,new_color');
    
    
    
        delete_input = document.getElementById('delete_input');
        delete_input.setAttribute('placeholder','number or color');


        add_element('button','create_button',create_input);
        add_element('button','read_button',read_input);
        add_element('button','update_button',update_input);
        add_element('button','delete_button',delete_input);

        //set the target locations for the CRUD buttons
        create_button = document.getElementById('create_button');
        read_button = document.getElementById('read_button');
        update_button = document.getElementById('update_button');
        delete_button = document.getElementById('delete_button');

        //set the events for the CRUD buttons    

        crud_button_event(create_button,'click',function(event){

            if(create_input.value.length > 1){
                
                current_element = document.createElement('li');
                current_element.textContent = String(create_input.value).toLowerCase();
                current_element.style.backgroundColor = current_element.textContent;

                create_input.value = null;

                ordered_list.appendChild(current_element);
                update_list_elements();
                
            }else{
                //no value inside the create_input
            }
             
            
                
        });


        crud_button_event(read_button,'click',function(event){
                
                
            read_array_of_colors = String(read_input.value).toLowerCase();
            read_array_of_colors = read_array_of_colors.split(',');
            
            if(read_array_of_colors.length > 1){
                
                for(var i=0;i < read_array_of_colors.length;i++){
                
                    current_element = document.createElement('li');
                    current_element.textContent = read_array_of_colors[i];
                    current_element.style.backgroundColor = current_element.textContent;
                    
                    read_input.value = null;
                    
                    ordered_list.appendChild(current_element);
                    update_list_elements();
                    
                }                                                            
            }else{
                // read_array_of_colors is empty or only 1 value
                // user should use the create_button instead
            }
            
            
        });

        // UPDATE CRUD BUTTON FUNCTIONS
        crud_button_event(update_button,'click',function(event){
                
            update_array_of_colors = String(update_input.value).toLowerCase();
            update_array_of_colors = update_array_of_colors.split(',');
            
            update_list_elements();
            if(list_elements_array.length > 0){
            
                old_color = String(update_input.value).toLowerCase().split(',');
                old_color = old_color[0];
                
                new_color = String(update_input.value).toLowerCase().split(',');
                new_color = new_color[1];
                
                update_input.value = null;
                
                for(var i=0;i<list_elements_array.length;i++){
                    if(list_elements_array[i].style.backgroundColor === old_color){
                        list_elements_array[i].style.backgroundColor = new_color;
                        list_elements_array[i].textContent = new_color;
                    }
                }
                
                update_list_elements();
                
            }
            

        });

        crud_button_event(delete_button,'click',function(event){
                
            
            
                if(delete_input.value.length > 0){
                
                    update_list_elements();

                    element_to_delete = String(delete_input.value).toLowerCase();
                    
                    for(var i=0;i<list_elements_array.length;i++){
                    
                        if(list_elements_array[i].textContent === element_to_delete){
                            
                            list_elements_array[i].remove();
                            
                            i = i-1;
                            
                            
                            delete_input.value = null;                                 
                            update_list_elements();

                        } 
                        
                        update_list_elements();
                    }
                    
                     if(Number(delete_input.value) > 0){
                        
                        element_to_delete = Number(delete_input.value)-1;
                        
                         list_elements_array[element_to_delete].remove();
                         
                         update_list_elements();
                    }
                    
            }
    });

    
    
});