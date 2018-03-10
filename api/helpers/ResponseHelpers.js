exports.error = (message) => {
    return { error: true, message };
};

exports.ok = (payload) => {
    return { error: false, payload };
};

exports.notImplemented = () => {
    return this.error("This feature is not implemented yet!");
};
