export const getRemainingDays = (archiveDate, ttlSeconds = 864000) => {
    const archiveDateObj = new Date(archiveDate);
    // if (isNaN(archiveDateObj.getTime())) return "Invalid Date";
    const expirationDate = new Date(archiveDateObj.getTime() + ttlSeconds * 1000);
    const now = new Date();
    const timeDifference = expirationDate - now;

    return timeDifference <= 0 ? "Expire today." : `${Math.ceil(timeDifference / (1000 * 60 * 60 * 24))} days remaining.`;
}