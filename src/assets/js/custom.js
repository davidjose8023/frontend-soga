/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/

/*$(document).on('change','#fecha_form',function(){
    $(this).val($(this).val());

});*/
function scroll() {
    $('#slimtest1, #slimtest4').perfectScrollbar();

}function next() {
    $(".tab-wizard").steps("next",{});

}
function previous() {
    $(".tab-wizard").steps("previous",{});
  
}
function finish() {
    $(".tab-wizard").steps("finish",{});
  
}
function wizard() {
    $(".tab-wizard").steps({
        headerTag: "h6"
        , bodyTag: "section"
        , transitionEffect: "fade"
        , titleTemplate: '<span class="step">#index#</span> #title#'
        ,enableAllSteps: false
        ,enablePagination: false
        , labels: {
            finish: "Finalizar",
            next: "Siguiente",
            previous: "Anterior",
        }
        , onFinished: function (event, currentIndex) {
           swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");
                
        }
    });
    
    
    var form = $(".validation-wizard").show();
    
    $(".validation-wizard").steps({
        headerTag: "h6"
        , bodyTag: "section"
        , transitionEffect: "fade"
        , titleTemplate: '<span class="step">#index#</span> #title#'
        , labels: {
            finish: "Finalizar",
            next: "Siguiente",
            previous: "Anterior",
        }
        , onStepChanging: function (event, currentIndex, newIndex) {
            return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
        }
        , onFinishing: function (event, currentIndex) {
            return form.validate().settings.ignore = ":disabled", form.valid()
        }
        , onFinished: function (event, currentIndex) {
             swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");
        }
    }), $(".validation-wizard").validate({
        ignore: "input[type=hidden]"
        , errorClass: "text-danger"
        , successClass: "text-success"
        , highlight: function (element, errorClass) {
            $(element).removeClass(errorClass)
        }
        , unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass)
        }
        , errorPlacement: function (error, element) {
            error.insertAfter(element)
        }
        , rules: {
            email: {
                email: !0
            }
        }
    })
}

function init_calendar(event) {
    !function($) {
        "use strict";
    
        var CalendarApp = function() {
            this.$body = $("body")
            this.$calendar = $('#calendar'),
            this.$event = ('#calendar-events div.calendar-events'),
            this.$categoryForm = $('#add-new-event form'),
            this.$extEvents = $('#calendar-events'),
            this.$modal = $('#agenda'),
            this.$saveCategoryBtn = $('.save-category'),
            this.$calendarObj = null
        };
    
    
        
        /* on click on event */
        CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
            var $this = this;
                //console.log(calEvent._id);
                var form = $("<form></form>");

                //form.append("<label>Change event name</label>");
                //form.append("<div class='input-group'><input class='form-control' type=text value='" + calEvent.title + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> Save</button></span></div>");
                $this.$modal.modal({
                    backdrop: 'static'
                });
                $($this.$modal).find('#nombres_mod').val(calEvent.nombres);
                $($this.$modal).find('#apellidos_mod').val(calEvent.apellidos);
                $($this.$modal).find('#rut_mod').val(calEvent.rut);
                $($this.$modal).find('#telefono_mod').val(calEvent.telefono);
                $($this.$modal).find('#email_mod').val(calEvent.email);
                // $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                //     $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                //         return (ev._id == calEvent._id);
                //     });
                //     $this.$modal.modal('hide');
                // });
                // $this.$modal.find('form').on('submit', function () {
                //     calEvent.title = form.find("input[type=text]").val();
                //     $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                //     $this.$modal.modal('hide');
                //     return false;
                // });
        },

 
        CalendarApp.prototype.enableDrag = function() {
            //init events
            $(this.$event).each(function () {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
            });
        }
        /* Initializing */
        CalendarApp.prototype.init = function() {
            this.enableDrag();
            /*  Initialize the calendar  */
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var form = '';
            var today = new Date($.now());
    
            var defaultEvents =  event;
    
            var $this = this;
            $this.$calendarObj = $this.$calendar.fullCalendar({
                //slotDuration: '00:00:02', /* If we want to split day time each 15minutes */
                monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                dayNamesShort:['Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab', 'Dom'],
                minTime: '08:00:00',
                maxTime: '19:00:00',  
                defaultView: 'month',
                height: 600,
                //handleWindowResize: true,  
                
                views: {
                    month:{ buttonText: 'Calendario' },
                    agendaDay: { buttonText: 'Lista por día' }
                },
                 
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    //right: 'month,agendaWeek,agendaDay'
                    right: 'month,agendaDay'
                },
                events: defaultEvents,
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                eventLimit: true, // allow "more" link when too many events
                eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); }
     
    
            });
    
            //on new event
            // this.$saveCategoryBtn.on('click', function(){
            //     var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
            //     var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
            //     if (categoryName !== null && categoryName.length != 0) {
            //         $this.$extEvents.append('<div class="calendar-events" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="fa fa-circle text-' + categoryColor + '"></i>' + categoryName + '</div>')
            //         $this.enableDrag();
            //     }
    
            // });
        },
    
       //init CalendarApp
        $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp
        
    }(window.jQuery),
    
    //initializing CalendarApp
    function($) {
        "use strict";
        $.CalendarApp.init()
        
    }(window.jQuery);

    


}


function init_form(){
    $(function() {
        "use strict";
        $('.select2').select2({ top: 'auto' });
        $('#fecha_form').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        //let datepicker = $('#fecha_form');
 
        //datepicker.datepicker('setDate', new Date());
    });

}
function getvalueSelect(){
    return $('#patologias').val();
}
function setZoon(valor){
    
    $('body').css('zoom', ' ' + valor + '%');
}
function setvalueSelect(selectedValues){

    //console.log(selectedValues);

    setTimeout(function () {
        $('#patologias').select2('val',[selectedValues]);
    }, 500);
    
}
function init_plugins(){

    $(function() {
        "use strict";
        $(function() {
            $(".preloader").fadeOut();
        });
        jQuery(document).on('click', '.mega-dropdown', function(e) {
            e.stopPropagation()
        });
        // ============================================================== 
        // This is for the top header part and sidebar part
        // ==============================================================  
        var set = function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".sidebartoggler i").addClass("ti-menu");
            } else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
            }

            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            

            
            if (height > topOffset) {
 
                $(".page-wrapper").css("min-height", screen.height + "px");
            }

        };
        $(window).ready(set);
        $(window).on("resize", set);

        // ============================================================== 
        // Theme options
        // ==============================================================     
        $(".sidebartoggler").on('click', function() {
            if ($("body").hasClass("mini-sidebar")) {
                $("body").trigger("resize");
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
                
            } else {
                $("body").trigger("resize");
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                
            }
        });

        // this is for close icon when navigation open in mobile view
        $(".nav-toggler").click(function() {
            $("body").toggleClass("show-sidebar");
            $(".nav-toggler i").toggleClass("ti-menu");
            $(".nav-toggler i").addClass("ti-close");
        });

        $(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
            $(".app-search").toggle(200);
        });
        // ============================================================== 
        // Right sidebar options
        // ============================================================== 
        $(".right-side-toggle").click(function() {
            $(".right-sidebar").slideDown(50);
            $(".right-sidebar").toggleClass("shw-rside");
        });
        // ============================================================== 
        // This is for the floating labels
        // ============================================================== 
        $('.floating-labels .form-control').on('focus blur', function(e) {
            $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');

        // ============================================================== 
        // Auto select left navbar
        // ============================================================== 
        $(function() {
            var url = window.location;
            var element = $('ul#sidebarnav a').filter(function() {
                return this.href == url;
            }).addClass('active').parent().addClass('active');
            while (true) {
                if (element.is('li')) {
                    element = element.parent().addClass('in').parent().addClass('active');
                } else {
                    break;
                }
            }

        });
        // ============================================================== 
        //tooltip
        // ============================================================== 
        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        })
        // ============================================================== 
        //Popover
        // ============================================================== 
        $(function() {
            $('[data-toggle="popover"]').popover()
        })
        // ============================================================== 
        // Sidebarmenu
        // ============================================================== 
        $(function() {
            $('#sidebarnav').AdminMenu();
        });

        // ============================================================== 
        // Perfact scrollbar
        // ============================================================== 
        $('.scroll-sidebar, .right-side-panel, .message-center, .right-sidebar').perfectScrollbar();
        
        // ============================================================== 
        // Resize all elements
        // ============================================================== 
        $("body").trigger("resize");
        // ============================================================== 
        // To do list
        // ============================================================== 
        $(".list-task li label").click(function() {
            $(this).toggleClass("task-done");
        });

        

        // ============================================================== 
        // Collapsable cards
        // ==============================================================
        $('a[data-action="collapse"]').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
            $(this).closest('.card').children('.card-body').collapse('toggle');

        });
        // Toggle fullscreen
        $('a[data-action="expand"]').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
            $(this).closest('.card').toggleClass('card-fullscreen');
        });

        // Close Card
        $('a[data-action="close"]').on('click', function() {
            $(this).closest('.card').removeClass().slideUp('fast');
        });

    });


}