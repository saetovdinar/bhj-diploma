/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, response)=>{
      this.element.querySelector('.accounts-select').innerHTML = response.data.reduce((acc, item) =>  acc + `<option value="${item.id}">${item.name}</option>`, '')
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

    Transaction.create(data, (err, response) => {
      if(response && response.success) {
        this.element.reset();
        
        App.getModal(data.type === 'income' ? 'newIncome' : 'newExpense').close();
        App.update();
      }
    })
  }
}