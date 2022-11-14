module.exports.buildOpt = ( shisya, danchi, shikibetu, pageIndex) => {
    const params = new URLSearchParams();
    params.append('shisya', shisya);
    params.append('danchi', danchi);
    params.append('shikibetu', shikibetu);
    params.append('pageIndex', pageIndex);
    params.append('orderByField', '0');
    params.append('orderBySort', '0');
    return { method: 'POST', body: params };
}