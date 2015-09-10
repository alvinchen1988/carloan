(function(){
    var FinanceCalculator = {
        CreditRatingList: [
            {
                name: 'bad',
                interest: 29.0
            },
            {
                name:'poor',
                interest:19.9
            },
            {
                name:'average',
                interest:12.9
            },
            {
                name:'good',
                interest:8.9
            },
            {
                name:'excellent',
                interest:6.9
            }
        ],
        CreditRating: {
            name: 'bad',
            interest: 29.0
        },
        CreditAmount: 10000,
        CreditAmountMin: 5000,
        CreditAmountMax: 50000,
        CreditAmountInterval:500,
        CreditLength: 36,
        CreditLengthMin: 12,
        CreditLengthMax: 96,
	    CreditLengthInterval: 3
    }


    //Calculates the payment
    //Number Format
    function numberFormat(n, sep, decimals) {
        sep = sep || "."; // Default to period as decimal separator
        decimals = decimals || 2; // Default to 2 decimals

        var result = '';

        if(n.toFixed(decimals).split(sep)[1] == 00){
            result = n.toLocaleString().split(sep)[0];
        }
        else{
            result =  n.toLocaleString().split(sep)[0]
                + sep
                + n.toFixed(decimals).split(sep)[1];
        }

        return result;
    }

    //#Source: http://www.financeformulas.net/Loan_Payment_Formula.html#Calc-Header
    function getPayment(rating, amount, length){
        result = amount*(rating.interest*0.01/12) / (1-Math.pow(1 + rating.interest*0.01/12, -length));
        return numberFormat(result);
    }



    //Updates monthly payment view
    function updatePayment(){
        $('.monthly-payment').text('$' + getPayment(FinanceCalculator.CreditRating, FinanceCalculator.CreditAmount, FinanceCalculator.CreditLength) );
    }

    //Updates credit amount view
    function updateCreditAmount(amount){
        FinanceCalculator.CreditAmount = amount;
        $('.credit-amount').val(FinanceCalculator.CreditAmount);
    }

    //Updates credit length view
    function updateCreditLength(length){
        FinanceCalculator.CreditLength = length;
        $('.credit-length').val(FinanceCalculator.CreditLength);
    }


    function PopulateCalculator(){

        //Populate credit ratings
        for(var i=0; i<FinanceCalculator.CreditRatingList.length; i++){
            var buttonClass = i == 0 ? 'active':'';
            var buttonHTML = '<button type="button" class="btn btn-default ' + buttonClass + '">'+ FinanceCalculator.CreditRatingList[i].name +'</button>';
            $('#credit-rating').append(buttonHTML);
        }

        //Credit Rating binding
        $('#credit-rating button').click(function () {

            var self = $(this);

            for(var i=0; i<FinanceCalculator.CreditRatingList.length; i++){
                if(FinanceCalculator.CreditRatingList[i].name == self.text()){
                    FinanceCalculator.CreditRating = FinanceCalculator.CreditRatingList[i];
                }
            }

            if(!$(this).hasClass('active')){
                $('#credit-rating button').each(function () {
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                    }
                });
                $(this).addClass('active');
            }

            updatePayment();
        });


        /////////Credit Amount Slider//////////
        //Credit Amount slider
        $('#credit-amount-slider').slider({
            range: 'min',
            value: FinanceCalculator.CreditAmount,
            min: FinanceCalculator.CreditAmountMin,
            max: FinanceCalculator.CreditAmountMax,
            step:FinanceCalculator.CreditAmountInterval,
            slide: function( event, ui ) {
                updateCreditAmount(ui.value);
                updatePayment();
            },
            change: function(event, ui){
                updateCreditAmount(ui.value);
                updatePayment();
            }
        });

        //Control bindings
        $('.credit-slider .control').click(function(){
            var creditSlider = $('#credit-amount-slider');
            var currentValue = creditSlider.slider('value');

            // if(currentValue != FinanceCalculator.CreditAmountMin && currentValue != FinanceCalculator.CreditAmountMax ){

                if($(this).hasClass('control-left')){
                    creditSlider.slider('value', currentValue - FinanceCalculator.CreditAmountInterval );
                }
                else if($(this).hasClass('control-right')){
                    creditSlider.slider('value', currentValue + FinanceCalculator.CreditAmountInterval );
                }

            // }
        });


        $('.credit-amount').keyup(function(){
            console.log($(this).val());

             if(isNaN(parseInt($(this).val()))){
                 
                  console.log('error');
                $('.monthly-payment').text('enter a number');
            }else{
                  console.log('sss');
                   updateCreditAmount($(this).val());
                    updatePayment();
            }   
        });

        $('.credit-length').keyup(function(){
            console.log($(this).val());
          
            if(isNaN(parseInt($(this).val()))){
                 
                  console.log('error');
                $('.monthly-payment').text('enter a number');
            }else{
                  console.log('sss');
                  updateCreditLength($(this).val());
                  updatePayment();

            }
        });

        //Initialize values
        updateCreditAmount($( "#credit-amount-slider" ).slider( "value" )); //Credit Amount
        $('.credit-slider .control-left').find('.control-value').text('$' + numberFormat(FinanceCalculator.CreditAmountMin)); //Credit Slider Min
        $('.credit-slider .control-right').find('.control-value').text('$' + numberFormat(FinanceCalculator.CreditAmountMax)); //Credit Slider Max

        //////////End of Credit Amount Slider//////////




        //////////Credit Length Slider//////////
        //Credit Length slider
        $('#credit-length-slider').slider({
            range: 'min',
            value: FinanceCalculator.CreditLength,
            min: FinanceCalculator.CreditLengthMin,
            max: FinanceCalculator.CreditLengthMax,
            step:FinanceCalculator.CreditLengthInterval,
            slide: function( event, ui ) {
                updateCreditLength(ui.value)
                updatePayment();
            },
            change: function(event, ui){
                updateCreditLength(ui.value)
                updatePayment();
            }
        });
        //Control bindings
          
        $('.credit-length-slider .control').click(function(){
            var creditLengthSlider = $('#credit-length-slider');
            var currentLengthValue = creditLengthSlider.slider('value');

            // if(currentLengthValue != FinanceCalculator.CreditLengthMin && currentLengthValue != FinanceCalculator.CreditLengthMax ){

                // console.log('hi');
                if($(this).hasClass('control-left')){
                    creditLengthSlider.slider('value', currentLengthValue - FinanceCalculator.CreditLengthInterval);
                }
                else if($(this).hasClass('control-right')){
                    creditLengthSlider.slider('value', currentLengthValue + FinanceCalculator.CreditLengthInterval);
                }

            // }
        });

        //Initialize values
        updateCreditLength($("#credit-length-slider").slider( "value" )); //Credit Length
        $('.credit-length-slider .control-left').find('.control-value').text(FinanceCalculator.CreditLengthMin + ' months'); //Credit Length Slider Min
        $('.credit-length-slider .control-right').find('.control-value').text(FinanceCalculator.CreditLengthMax + ' months'); //Credit Length Slider Max

        //////////End of Credit Length Slider//////////

        updatePayment(); //Monthly payment

    }

    PopulateCalculator();

    // $('.credit-amount.btn').before('$');


}());
