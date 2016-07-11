(function($){
    'use strict';
    $(document).ready(function(){

        var canvas = document.getElementById('canvas'),
            canvasW = canvas.width,
            canvasH = canvas.height,
            canvasFontSize = 50,
            i = 0,
            text = '',
            animationType = '',
            encoder,
            ctx = canvas.getContext('2d');
            
            var c = createjs;
            var stage = new c.Stage("canvas");

            
        ctx.font = canvasFontSize + 'px Verdana sans-serif',
        ctx.lineWidth = 5,
        ctx.lineJoin = 'round',
        ctx.textAlign = 'center',
        ctx.textBaseline = 'middle',
        //ctx.globalAlpha = 2/3,
        ctx.strokeStyle = '#fff',
        ctx.fillStyle = '#fff';

        $('#draw').on('click', function(){

            text = $('#input').val();
            animationType = $('#animtype').val();
            if(text === '') {
                $('.error-input').show();
                return;
            } else {
                $('.error-input').hide();
            }
            if(animationType === '') {
                $('.error-select').show();
                return;
            } else {
                $('.error-select').hide();
            }
            $('#video').attr('src', '');
            $('#download').attr('href', '');
            ctx.clearRect(0, 0, canvasW, canvasH);
            var text = new c.Text(text, "bold 40px Verdana sans-serif");
            text.x = canvasW /2;
            text.y = canvasH / 2 - 20;
            text.textAlign = 'center';
            text.alpha = 1;
            text.color = '#fff';
            stage.removeAllChildren();
            stage.update();
            /*ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillText(text, canvas.width/2 - canvasFontSize/2, canvasH/2 - canvasFontSize/2);*/
            encoder = new Whammy.Video(15);
            /*text.alpha = 1;
            text.scaleX = 1.5;
            text.scaleY = 1.5;
            stage.addChild(text);*/
            animations[animationType](text);
            //bouncedDrop(text);

        });

        var animations = {};

        animations.zoomIn = zoomIn;
        animations.zoomOut = zoomOut;
        animations.rotateText = rotateText;
        animations.textFadeIn = textFadeIn;
        animations.textShadow = textShadow;
        animations.bouncedDrop = bouncedDrop;
        animations.pulse = pulse;
        animations.shake = shake;
        animations.floatingText = floatingText;
        animations.elastic = elastic;
        animations.skewing = skewing;

        function convertVideo() {
            var output = encoder.compile();
            var url = (window.URL || window.webkitURL).createObjectURL(output);
            $('#video').attr('src', url);
            $('#download').attr('href', url);
        }

        function zoomIn(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.alpha = 1;
            text.scaleX = 0;
            text.scaleY = 0;
            stage.addChild(text);
            c.Tween.get(text)
                .to({scaleX:1, scaleY: 1, alpha: 1}, 2000)
                .wait(500)
                .call(convertVideo);

            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }

        function zoomOut(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.alpha = 0;
            text.scaleX = 5;
            text.scaleY = 5;
            stage.addChild(text);
            var i = 50;
            c.Tween.get(text)
                .to({scaleX:1, scaleY: 1, alpha: 1}, 2000)
                .wait(500)
                .call(convertVideo);

            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }

        function rotateText(text) {
            text.scaleX = 0;
            text.scaleY = 0;
            stage.addChild(text);
            c.Tween.get(text)
                .to({scaleX:1, scaleY: 1, rotation: 360}, 2000)
                .wait(500)
                .call(convertVideo);
            stage.update()

            createjs.Ticker.addEventListener("tick", function() {
                encoder.add(ctx);
                stage.update();
            });
        }

        function textFadeIn(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.alpha = 0;
            stage.addChild(text);
            c.Tween.get(text)
                .to({alpha:1}, 2000)
                .wait(500)
                .call(convertVideo);

            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }

        function textShadow(text) {
            var i = 0;
            ctx.clearRect(0, 0, canvasW, canvasH);
            stage.addChild(text);
            c.Tween.get(text)
                .to({y:canvasH/2 - 20}, 1000)
                .wait(500)
                .call(convertVideo)
                .addEventListener('change', addShadow)

            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
            function addShadow(event) {
                i += 0.2;
                text.shadow = new c.Shadow('#ccc', i, i, 7);
            }
        }

        function bouncedDrop(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.y = 0;
            stage.addChild(text);
            c.Tween.get(text)
                .to({y:canvasH/2 - 20}, 1000, c.Ease.bounceOut)
                .wait(500)
                .call(convertVideo);

            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }


        function pulse(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.alpha = 0;
            text.scaleX = 0;
            text.scaleY = 0;
            stage.addChild(text);
            c.Tween.get(text)
                .to({alpha: 1, scaleX: 1.8, scaleY: 1.8}, 1000, c.Ease.linear)
                .to({alpha: 1, scaleX: 0, scaleY: 0}, 1000, c.Ease.linear)
                .to({alpha: 1, scaleX: 1.4, scaleY: 1.4}, 1000, c.Ease.linear)
                .to({alpha: 1, scaleX: 0, scaleY: 0}, 1000, c.Ease.linear)
                .to({alpha: 1, scaleX: 1, scaleY: 1}, 1000, c.Ease.linear)
                .wait(500)
                .call(convertVideo);

            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }

        function shake(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            ctx.translate(canvasW / 2 + 20, canvasH / 2);
            stage.addChild(text);
            c.Tween.get(text)
                .to({rotation: 20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: -20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: 20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: -20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: 20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: -20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: 20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: -20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: 20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)
                .to({rotation: -20}, 20, c.Ease.linear)
                .to({rotation: 0}, 20, c.Ease.linear)                
                .wait(500)
                .call(convertVideo);

            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }

        function floatingText(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.x = Math.floor(Math.random() * canvasW) + 20;
            text.y = Math.floor(Math.random() * canvasH) + 20;
            stage.addChild(text);
            c.Tween.get(text)
                .to({x: canvasW / 2 - 20, y: canvasH / 2 - 20}, 2000, c.Ease.cubicInOut)
                .wait(500)
                .call(convertVideo);
            var bounds = text.getBounds();
            
            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }

        function elastic(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.shadow = new c.Shadow('#ccc', 5, 5, 7);
            text.scaleX = -1.5;
            text.scaleY = 1;
            stage.addChild(text);
            c.Tween.get(text)
                .to({scaleX: 1, scaleY: 1}, 2000, c.Ease.elasticInOut)
                .wait(500)
                .call(convertVideo);
            
            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }

        function skewing(text) {
            ctx.clearRect(0, 0, canvasW, canvasH);
            text.skewX = 0;
            text.skewY = 25;
            stage.addChild(text);
            c.Tween.get(text)
                .to({skewX: 0}, 500, c.Ease.linear)
                .to({skewY: 0}, 500, c.Ease.linear)
                .to({skewY: 0}, 500, c.Ease.linear)
                .wait(500)
                .call(convertVideo);
            
            stage.update()
            createjs.Ticker.addEventListener("tick", function() {
                stage.update();
                encoder.add(ctx);
            });
        }


    });

})(jQuery);