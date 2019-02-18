//Classe 
class CalcController {
    //Método construtor da classe
    constructor(){
        //Atributos da classe CalcController
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        //Executando os principais métodos da classe
        this.initialize();
        this.initButtonEvents();
    }

    //Método principal
    initialize(){
        this.setDisplayDateTime();
        //Método para atualizar a data e hora a cada segundo
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay()
    }

    //Método que adiciona multiplos eventos aos buttons
    addEventListenerAll(element, events, callback){
        //Pega o parâmetro events, separa por espaço e retorna um array
        //Percorre o array retornado no método split()
        events.split(' ').forEach(event =>{
            //Adiciona cada event do array (split()) ao element recebido como parâmetro
            //Executa o callback recebido
            //False anula os demais events quando o primeiro é acionado
            element.addEventListener(event, callback, false);
        })
    }

    //Método que limpa o display caso o button clicado seja AC
    clearAll(value){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    //Método que limpa a ultima entrada do display caso o button clicado seja ce
    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    //Método que retorna a ultima operação
    getLastOperation(){
        //Retorna a ultima operação
        return this._operation[this._operation.length - 1]
    }

    //Método que valida se é uma das operações do array
    isOperator(value){
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
          
    }
    
    //Método para realizar o push da operação
    pushOperation(value){
        //Realiza o push de value no array _operation
        //Verifica se o tamanho do array é 3 e executa o cálculo
        this._operation.push(value);
        if(this._operation.length > 3) {
            this.calc();
        }
    }
    
    //Método que retorna o resultado o cálculo depois de executar o eval()
    getResult(){
        //Join() separa o array e retorna uma string
        //Eval() retorna o cálculo da string
        return eval(this._operation.join(''));
    }
    //Método para realizar o primeiro cálculo
    calc(){        
        //Verifica se _operator é maior que 3
        //Se sim, remove o ultimo resultado do array _operator
        //Adiciona o valor (item) retornado do método getLastItem ao atributo _lastOperator
        //Adiciona o resultado retornado do método getResult ao atributo _lastNumber
        let last = '';
        this._lastOperator = this.getLastItem(true);

        if(this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getResult() ;   
        } else if(this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false) ;
        }
        //Verifica se o operador é o % e executa a regra de calculo do mesmo
        let result = this.getResult();
        if(last == '%'){
           result /= 100;
           this._operation = [result];
        } else {
            this._operation = [result];
            if(last){
                this._operation.push(last);
            }
        }
        //Atualiza o display com o resultado do cálculo
        this.setLastNumberToDisplay();
    }

    //Método que substitui o ultimo value da operação (+, -, *, /, %) por um novo
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }

    //Método para pegar o ultimo item da operação
    getLastItem(isOperator = true){
        //Percorre o array _operation até a ultima posição
        //Adiciona a ultima posição encontrada na variável lastItem
        //Para a execução do for()
        //Retorna a variável lastItem
        let lastItem;
        for(let i = this._operation.length - 1; i >= 0; i--){
            
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break
            }
            
        }
        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem
    }
    //Método para adicionar o ultimo valor no display
    setLastNumberToDisplay(){
        //Executa o método getLastItem passando false como parâmento para retornar o ultimo valor number e salva numa variável
        //Verifica se lastNumber é diferente de number, se sim atribui o valor 0
        //Adiciona a variável lastNumber no display
        let lastNumber = this.getLastItem(false)
        if(!lastNumber){
            lastNumber = 0;
        }
        this.displayCalc = lastNumber;
    }

    //Método que adiciona um item ao array _operation
    addOperation(value){
        //Verifica se o ultimo indice da operação é um número
        if(isNaN(this.getLastOperation())){
            //Verifica se o value é uma das operações válidas
            if(this.isOperator(value)){
                //Substitui a ultima operação por value
                this.setLastOperation(value);
            } else {
                //Adiciona value ao array _operation
                //Atualiza o display
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            //Verifica o value e adiciona a operação
            if(this.isOperator(value)){
                this.pushOperation(value);
            } else {
                //Converte o retorno de getLastOperation e value (caso número) para string e concatena
                //Converte o newValue para número e substitui a ultima posição
                //Atualizando display
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseFloat(newValue));
                this.setLastNumberToDisplay();
            }
        }
    }

    addDot(){
        let lastOperation = this.getLastOperation();
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();
    }

    //Método que imprime Error no display
    setError(){
        this.displayCalc = 'Error';
    }

    //Método para verificar a função de cada button
    execBtn(value){
        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%'); 
                break;
            case 'ponto':
                this.addDot();
                break;
            case 'igual':
                this.calc();
                break;
            case '00':
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }
    }

    //Mátodo que inicia os eventos de buttons
    initButtonEvents(){
        //Acessando o DOM e armazenando em uma variável local
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
    
        //Percorrendo os buttons
        buttons.forEach((btn, index) => {
            //Executa o métodos addEventListenerAll recebendo o element, events e callback
            this.addEventListenerAll(btn, 'click drag', e => {
                //Extraindo texto da classe de cada button
                let textBtn = btn.className.baseVal.replace("btn-", "");
                //Executa o evento que verifica a função de cada button
                this.execBtn(textBtn);
            });
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e =>{
                btn.style.cursor = 'pointer';
            })
        })
    }

    //Método para formatar e adicionar a data e hora aos elementos do DOM
    setDisplayDateTime(){
        //Recebe a data atual formatada no padrão pt-BR
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {day: '2-digit', month: 'short', year: 'numeric'});
        //Recebe a hora atual formatada no padrão pt-BR
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    //Método que retorna o valor da hora
    get displayTime(){
        return this._timeEl.innerHTML
    }

    //Método que atribui um novo valor a hora
    set displayTime(time){
        this._timeEl.innerHTML = time;
    }

    //Método que retorna o valor da data
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    //Método que atribui um novo valor a data
    set displayDate(date){
        this._dateEl.innerHTML = date;
    }

    //Método que retorna o valor de _displayCalc
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    //Método que atribui um novo valor ao _displayCalc
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    //Método que retorna o valor de _currentDate
    get currentDate(){
        return new Date();
    }

    //Método que retorna o valor de _currentDate
    set currentDate(date){
        this._currentDate = data;
    }

}