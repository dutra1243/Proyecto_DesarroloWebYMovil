export const difDate = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    if (diffDays > 0) {
        if (diffDays === 1) {
            return 'Yesterday';
        } else {
            return `Hace ${diffDays} días`;
        }
    } else if (diffHours > 0) {
        return `Hace ${diffHours} horas`;
    } else {
        return `Hace ${diffMinutes} minutos`;
    }
}