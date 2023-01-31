
const fiveSort = (nums) => { 

    let l = 0, r = nums.length - 1;
    
    while (l < r){
        while(nums[r] === 5)r --;
        if(l >= r) break
        if (nums[l] === 5)[nums[l], nums[r]] = [nums[r], nums[l]];
        l++ ;
    }   
    return nums;
}


console.log(fiveSort([12, 5, 1, 5, 12, 7]));
// -> [12, 7, 1, 12, 5, 5]
console.log(fiveSort([5, 2, 5, 6, 5, 1, 10, 2, 5, 5]));
// -> [2, 2, 10, 6, 1, 5, 5, 5, 5, 5]
console.log(fiveSort([5, 5, 5, 1, 1, 1, 4]));
// -> [4, 1, 1, 1, 5, 5, 5]
console.log(fiveSort([5, 5, 6, 5, 5, 5, 5]));
// -> [6, 5, 5, 5, 5, 5, 5]
console.log(fiveSort([5, 1, 2, 5, 5, 3, 2, 5, 1, 5, 5, 5, 4, 5]));
// -> [4, 1, 2, 1, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5]


