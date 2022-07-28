export interface Prioritizable {
    /**
     * The priority level of this element
     *
     * @type {number}
     * @memberof Prioritizable
     */
    PRIORITY: number
    
    /**
     * Get the level of the current instance compared to the passed one.
     * Returns:
     * -1 if this has higher priority 
     * 0 if this has same priority 
     * 1 if this has lower priority 
     *
     * @param {Prioritizable} element to compare against
     * @return {*}  {(-1 | 0 | 1)}
     * @memberof Prioritizable
     */
    getLevel(element: Prioritizable): -1 | 0 | 1
}