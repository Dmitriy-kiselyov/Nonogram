/* eslint-disable no-bitwise */

'use strict';

module.exports = (data) => {
    var v = 0, w, x, z = 0;

    var H = [],
        width = data[1][0] % data[1][3] + data[1][1] % data[1][3] - data[1][2] % data[1][3],
        height = data[2][0] % data[2][3] + data[2][1] % data[2][3] - data[2][2] % data[2][3],
        Aa = data[3][0] % data[3][3] + data[3][1] % data[3][3] - data[3][2] % data[3][3], Ba = 0, left = [], L = [], Ca = 0, top = [], M = [],
        E = [], F = [];
    for (x = 5; x < Aa + 5; x++) {
        var Ea = data[x][0] - data[4][1], Fa = data[x][1] - data[4][0], Ga = data[x][2] - data[4][3];
        z = data[x][3] - Ea - data[4][2];
        H[x - 5] = [(Ea + 256).toString(16).substring(1) + ((Fa + 256 << 8) + Ga).toString(16).substring(1), z];
    }
    for (w = 0; w < height; w++) {
        for (E[w] = [], F[w] = [], v = 0; v < width; v++) {
            E[w][v] = 0, F[w][v] = 0;
        }
    }
    var V = Aa + 5, Ha = data[V][0] % data[V][3] * (data[V][0] % data[V][3]) + data[V][1] % data[V][3] * 2 + data[V][2] % data[V][3],
        Ia = data[V + 1];
    for (x = V + 2; x <= V + 1 + Ha; x++) {
        for (v = data[x][0] - Ia[0] - 1; v < data[x][0] - Ia[0] + data[x][1] - Ia[1] - 1; v++) {
            E[data[x][3] - Ia[3] - 1][v] = data[x][2] - Ia[2];
        }
    }
    var W = Aa + 7 + Ha;
    if (data.length > W) {
        var Ka = [];
        for (w = 0; w < height; w++) {
            for (Ka[w] = [], v = 0; v < width; v++) {
                Ka[w][v] = 0;
            }
        }
        var La = data[W][0] % data[W][3] * (data[W][0] % data[W][3]) + data[W][1] % data[W][3] * 2 + data[W][2] % data[W][3], Ma = data[W + 1];
        for (x = W + 2; x <= W + 1 + La; x++) {
            for (v = data[x][0] - Ma[0] - 1; v < data[x][0] - Ma[0] + data[x][1] - Ma[1] - 1; v++) {
                Ka[data[x][3] - Ma[3] - 1][v] = data[x][2] - Ma[2];
            }
        }
    }
    for (w = 0; w < height; w++) {
        left[w] = [];
        L[w] = [];
        for (v = 0; v < width;) {
            var Na = v;
            for (z = E[w][v]; v < width && E[w][v] === z;) {
                v++;
            }
            v - Na > 0 && z > 0 && (left[w][left[w].length] = [v - Na, z], L[w][left[w].length] = !1);
        }
        left[w].length > Ba && (Ba = left[w].length);
    }
    for (v = 0; v < width; v++) {
        top[v] = [];
        M[v] = [];
        for (w = 0; w < height;) {
            var Oa = w;
            for (z = E[w][v]; w < height && E[w][v] === z;) {
                w++;
            }
            w - Oa > 0 && z > 0 && (top[v][top[v].length] = [w - Oa, z], M[v][top[v].length] = !1);
        }
        top[v].length > Ca && (Ca = top[v].length);
    }

    const colors = [];
    if (H.length > 1) {
        for (v = 0; v < H.length; v++) {
            colors.push(`#${H[v][0]}`);
        }
    }

    return {colors, top, left};
};
