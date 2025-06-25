

export function mapRequestQueryToWayPlanQuery(requestQuery: any): any {
    const wayPlanParams: any = {};

    Object.entries(requestQuery).forEach(([key, value]) => {
        // Same key 
        let newKey = key;

        // update key only if regex match 
        if (/_(MAX|MIN|LIKE)$/.test(key)) {
            newKey = key.replace(/_(MAX|MIN|LIKE)$/, '#$1');
        }

        wayPlanParams[newKey] = value;
    });

    return wayPlanParams;
}
