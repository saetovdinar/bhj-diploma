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
    if(this.element.getAttribute('id') === 'modal-new-expense') {
      let newOptions = new Option(response.name, response.id);
      this.element.querySelector('#expense-accounts-list').append(newOptions);
    }
    if(this.element.getAttribute('id') === 'modal-new-income') {
      let newOptions = new Option(response.name, response.id);
      this.element.querySelector('#income-accounts-list').append(newOptions);
    }
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
      if(response && response.succsess) {
        this.element.reset();
        new Modal(this.element.closest('fade')).close();
        App.update();
      }
    })
  }
}