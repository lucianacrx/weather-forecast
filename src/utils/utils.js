import moment from 'moment';

import { icons } from '../icons/icons.js';

export function formatDate(date) {
    if (date && moment(date).isValid()) {
      return moment.unix(date).utc().format('ddd D MMMM');
    }
    return '';
}

export function getWeekDay(date) {
    if (date && moment(date).isValid()) {
        return moment.unix(date).utc().format('dddd');
    }
    return '';
}

export function getHourFromUnixTime(date) {
    if (date && moment(date).isValid()) {
        return moment.unix(date).utc().format('HH:mm');
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

export function getIcon(icon) {
    return icons[icon];
}