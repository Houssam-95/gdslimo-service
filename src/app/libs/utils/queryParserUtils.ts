

export function transformMinMaxQuery(requestQuery: any): any {
    const transformedParams: any = {}; // Le nouvel objet qui contiendra les paramètres transformés

    // Regex pour trouver les clés qui se terminent par 'MIN' ou 'MAX'
    const suffixRegex = /(MIN|MAX)$/i; // Insensible à la casse pour plus de flexibilité

    // Utilise Object.entries pour parcourir chaque paire [clé, valeur]
    Object.entries(requestQuery).forEach(([key, value]) => {
        let newKey = key as string; // Par défaut, la nouvelle clé est l'ancienne clé

        // Teste si la clé actuelle se termine par 'MIN' ou 'MAX'
        if (suffixRegex.test(key)) {
            newKey = '#' + key; // Ajoute le '#' au début
        }

        // Assignation de la valeur à la nouvelle clé dans l'objet transformé
        transformedParams[newKey] = value;
    });

    return transformedParams;
}
