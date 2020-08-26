import moment from 'moment';

export function formatDate(date) {
    if (date && moment(date).isValid()) {
      return moment.unix(date).utc().format('ddd D MMMM');
    }
    return '';
}

export function getNextDays(date) {
    var nextDates = [];
    var nextDay = "";

    for(var i = 0; i < 5; i++) {
        nextDay = (date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
        nextDates.push(nextDay);
        date.setDate(date.getDate() + 1);
    }
    
    return nextDates;
};