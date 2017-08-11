jQuery(function ($) {

    // ===================================================== Fix fixed bg's jump

    /MSIE [6-8]|Mac/i.test(navigator.userAgent) || $("header, article, footer").each(function () {
        if ("fixed" == $(this).css("backgroundAttachment")) {
            var i = $(this), a = /WebKit/i.test(navigator.userAgent) ? 9 : 8;
            i.addClass("froid-fixed-bg").data({
                bgX: i.css("backgroundPosition").slice(0, i.css("backgroundPosition").indexOf(" ")),
                bgY: i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),
                margin: a
            })
        }
    }), $(window).bind("SIModals.modalsOpen", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", "calc(" + i.data("bgX") + " - " + i.data("margin") + "px) " + i.data("bgY"))
        })
    }), $(window).bind("SIModals.modalsClose", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", i.data("bgX") + " " + i.data("bgY"))
        })
    });

    // ===================================================== Mobile full-width && disable animation

    if (is_mobile()) {

        // Fix mobile fixed bg's
        $("header, section, article, footer, .section-bg-block::before").each(function () {
            if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');
        });

        // Remove animation
        function removeAnimation(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none',
                'transition': 'none',
                '-webkit-transition': 'none',
                'opacity': 1
            }).removeClass(className);
        }

        function removeTransform(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none'
            }).removeClass(className);
        }

        removeAnimation($('.cre-animate'), 'cre-animate');
        removeTransform($('.si-floating'), 'si-floating');
        removeTransform($('.si-floating2'), 'si-floating2');
        removeTransform($('.si-floating3'), 'si-floating3');
        removeTransform($('.si-floating4'), 'si-floating4');

        // Mobile stretch
        if (window.innerWidth <= 500)
            $('html, body').css('min-width', '500px').addClass('mobile');
        else
            $('html, body').css('min-width', '1200px').addClass('mobile');

        $('html').css('width', window.innerWidth + 'px');


        // ===================================================== All sound load
        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0
        });
    }
    else {

        // ===================================================== All sound load
        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0.3
        });

        // ===================================================== Sounds
        $(document).on('mouseenter',
            '.btn, ' +
            '.si-close, ' +
            '.phone-link, ' +
            '.si-jump, ' +
            '.swiper-button-prev, ' +
            '.swiper-button-next, ' +
            '.swiper-pagination-bullet, ' +
            '.tab-link', function () {
                $.ionSound.play('bip-2');
            });
        SIModals.beforeOpen = function () {
            $.ionSound.play('wuf-4');
        };
        SIModals.beforeClose = function () {
            $.ionSound.play('wuf-3');
        };

        // ===================================================== smooth scrolling
        if (!navigator.userAgent.match(/Trident\/7\./)) { // if not IE
            SmoothScroll({stepSize: 100});
        }
    }

    if (is_OSX()) {
        $('html, body').addClass('osx');
    }

    // ===================================================== Init all plugins and scripts
    $.fn.SIInit = function () {

        //Modal photos
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $('a[rel^=fancybox]').not('.cloned a').fancybox({
            helpers: {
                thumbs: true
            }
        });

        //Forms
        jQuery.validator.addMethod("rusonly", function (value, element) {
            return this.optional(element) || /^[А-Яа-я ]+$/i.test(value);
        }, "Поле может содержать только русские буквы и пробел!");

        jQuery.validator.addMethod("price", function (value, element) {
            return this.optional(element) || /^[А-Яа-я0-9. ]+$/i.test(value);
        }, "Поле может содержать только цифры, русские буквы, пробел и точку!");

        jQuery.validator.addMethod("custommail", function (value, element) {
            return this.optional(element) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(value);
        }, "E-mail должен быть формата xxx@xxx.xx и содержать только латинские буквы!");

        $(".client-phone").mask("+7 (999) 999-99-99", {placeholder: "_"});

        $('.send-form').each(function () {
            $(this).validate({
                rules: {
                    client_name: {
                        required: true,
                        rusonly: true
                    },
                    client_phone: {
                        required: true
                    },
                    client_mail: {
                        required: true,
                        custommail: true
                    },
                    client_price: {
                        required: true,
                        price: true
                    }
                },
                messages: {
                    client_name: {
                        required: "Укажите Ваше имя"
                    },
                    client_phone: {
                        required: "Укажите Ваш телефон"
                    },
                    client_mail: {
                        required: "Укажите Ваш e-mail",
                        email: "E-mail должен быть формата xxx@xxx.xx и содержать только латинские буквы!"
                    },
                    client_price: {
                        required: "Укажите Вашу цену"
                    }
                },
                submitHandler: function (form) {
					var  name, phone, mail, customerComment, price;
					name = $(form).find('input[name="client_name"]').val();
					phone = $(form).find('input[name="client_phone"]').val();
					mail = $(form).find('input[name="client_mail"]').val();
					customerComment = $(form).find('textarea[name="client_message"]').val();
					price = $(form).find('input[name="client_price"]').val();
					
                    $.post($(form).prop('action'), $(form).serialize(), function (res) {
                        var success_modal = ".si-success-modal";

                        $('.si-modal').fadeOut(SIModals.settings.fadeSpeed).removeClass("si-visible"), setTimeout(function () {
                            $(".si-modals-wrapper, .si-overlay, " + success_modal).fadeIn(SIModals.settings.fadeSpeed);
                            $(success_modal).addClass("si-visible");
                        }, SIModals.settings.fadeSpeed + 10);
						
                        switch (res.id) {
                            case 1:
                                yaCounter43687479.reachGoal('Call_confirm');
                                
								_rc('send', 'order', {
									'name': name,
									'phone': phone,
									'customerComment': customerComment,
									'orderMethod': 'recall-order',
									'callback': function(success, response) {
										if (success) {
											console.log('Спасибо, ваша заявка принята! Её номер: ' + response.id); 
											ga('send', 'event', 'feedback', 'recall', response.id);
										} else {
											console.log('К сожалению, не удалось отправить заявку.');
										}
									}
								});
                                break;
                            case 2:
                                yaCounter43687479.reachGoal('Call_confirm');
                                
								_rc('send', 'order', {
									'name': name,
									'phone': phone,
									'customerComment': customerComment,
									'orderMethod': 'recall-order',
									'callback': function(success, response) {
										if (success) {
											console.log('Спасибо, ваша заявка принята! Её номер: ' + response.id); 
											ga('send', 'event', 'feedback', 'recall', response.id);
										} else {
											console.log('К сожалению, не удалось отправить заявку.');
										}
									}
								});
                                break;
                            case 3:
                                yaCounter43687479.reachGoal('Application');
                                
								_rc('send', 'order', {
									'name': name,
									'phone': phone,
									'customerComment': 'Предложенная цена ' + price,
									'orderMethod': 'participate-in-drawing',
									'callback': function(success, response) {
										if (success) {
											console.log('Спасибо, ваша заявка на розыгрыш принята! Её номер: ' + response.id);
											ga('send', 'event', 'feedback', 'drawing', response.id);											
										} else {
											console.log('К сожалению, не удалось отправить заявку.');
										}
									}
								});
                                break;
                            case 4:
                                yaCounter43687479.reachGoal('Call_card');
                                ga('send', 'event', 'Call', 'Card', 'Event');
								ga('require', 'ecommerce', 'ecommerce.html');
								ga('ecommerce:addTransaction', {
									'id': res.ga.order_id,
									'affiliation': 'gameplast.ru'
								});
								
								ga('ecommerce:addItem', {
									'id': '".$result->id."',
									'name': res.ga.product_name,
									'quantity': '1'
								});
								ga('ecommerce:send'); 
                                break;
                            case 5:
                                yaCounter43687479.reachGoal('Wholesale');
                                ga('send', 'event', 'Whosale', 'Button', 'Event');
								_rc('send', 'order', {
									'name': name,
									'phone': phone,
									'email': mail,
									'orderMethod': 'recall-wholesale',
									'orderType': 'opt',
									'callback': function(success, response) {
										if (success) {
											console.log(name + phone + mail + 'Спасибо, ваша заявка оптовую покупку принята! Её номер: ' + response.id); 
											ga('send', 'event', 'feedback', 'wholesale', response.id);
										} else {
											console.log('К сожалению, не удалось отправить заявку.');
										}
									}
								});
                                break;
                        }

                    }, 'json');
                    $(form).each(function () {
                        this.reset();
                    });
                    return false;
                }
            });
        });

        //Jump links
        $('.si-jump').SIJump();

        //Page messages
        SIPageMessages.init();
    };

    $.fn.SIInit();


    // ===================================================== Modals
    $.fn.SIModalInit = function () {
        SIModals.init();

        // Init modals
        SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-opt-modal', '.opt-modal', false);
        SIModals.attachModal('.open-text-modal', '.text-modal', false, function () {
            return '.text-modal-' + $(this).data('id');
        });
        SIModals.attachModal('.open-product-modal', '.product-modal', false, function () {
            return '.product-modal-' + $(this).data('id');
        });

        // Modal controls
        SIModals.attachClose('.si-close');
    };

    $.fn.SIModalInit();

    // ===================================================== Counter
    var date = new Date();
    date.setHours(72, 0, 0, 0);
    $('.counter').countdown({
        until: date,
        layout: '<div class="pseudo-table">' +
        '<div class="counter-item pseudo-table-cell"><b>{dnn}</b>{dl}</div>' +
        '<div class="counter-item pseudo-table-cell"><b>{hnn}</b>{hl}</div>' +
        '<div class="counter-item pseudo-table-cell"><b>{mnn}</b>{ml}</div>' +
        '</div>'
    });

    // ===================================================== swiper
    var reviewsSlider = new Swiper('.reviews-block', {
        slidesPerView: 1,
        nextButton: '.review-next',
        prevButton: '.review-prev',
        paginationClickable: true,
        loop: true,
        onSlideChangeStart: function (swiper) {
            $.ionSound.play('wuf-1');
        }
    });

    var aboutSlider = new Swiper('.about-block', {
        slidesPerView: 2,
        spaceBetween: 20,
        nextButton: '.about-next',
        prevButton: '.about-prev',
        paginationClickable: true,
        loop: true,
        500: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        onSlideChangeStart: function (swiper) {
            $.ionSound.play('wuf-1');
        }
    });

    // ===================================================== spoiler
    $(".spoiler").spoiler();
    $(".spoiler").click(function () {
        if ($(this).hasClass('spoiler-active'))
            $(this).html('Скрыть');
        else
            $(this).html('Читать дальше');
    });

    // ===================================================== custom scripts
    function mobileHoverHelper(block) {
        block.click(function () {
            if (!$(this).hasClass('active')) {
                block.removeClass('active');
                $(this).addClass('active');
            }
            else {
                $(this).removeClass('active');
            }
        });

        $(document).click(function (e) {
            var activeBlock;

            block.each(function () {
                if ($(this).hasClass('active')) {
                    activeBlock = $(this);
                }
            });

            if (activeBlock != undefined) {
                if (!activeBlock.is(e.target) && activeBlock.has(e.target).length === 0) {
                    activeBlock.removeClass('active');
                }
            }
        });
    }

    if (window.innerWidth <= 500) {
        var advantage = $('.advantage-text-holder'),
            catalogue = $('.catalogue-item');

        mobileHoverHelper(advantage);
        mobileHoverHelper(catalogue);
    }

    $('.open-phone-modal').click(function () {
        yaCounter43687479.reachGoal('Call');
        ga('send', 'event', 'Call', 'Button', 'Event');
    });

    $('.btn-action').click(function () {
        yaCounter43687479.reachGoal('Sale');
        ga('send', 'event', 'Sale', 'Button', 'Event');
    });

    $('.btn-spoiler').click(function () {
        if (!$(this).hasClass('spoiler-active')) {
            yaCounter43687479.reachGoal('Read_more');
            ga('send', 'event', 'Read_more', 'Button', 'Event');
        }
    });
	
    // ===================================================== loader
    setTimeout(function () {
        $('html').removeClass('loading');
        setTimeout(function () {
            $('.loader').hide();
        }, 500);
    }, 1000);
});