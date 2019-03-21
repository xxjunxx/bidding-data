const mUser = require('../model/m-users');
const mBid = require('../model/m-bid');
const mItem = require('../model/m-items');
const mAuction = require('../model/m-auction');

UserController = {
    getBiddersByPage : async (ctx) => {
        let pageIndex = ctx.request.body.pageIndex;
        let pageSize =  ctx.request.body.pageSize;
        await mUser.findBiddersByPage(pageIndex, pageSize)
            .then(res => {
                ctx.response.body = {
                    result: res, 
                    currentPageIndex: pageIndex,
                    nextPageIndex: pageIndex + 1
                };
            });
    },
    getSellersByPage : async (ctx) => {
        let pageIndex = ctx.request.body.pageIndex;
        let pageSize =  ctx.request.body.pageSize;
        await mUser.findSellersByPage(pageIndex, pageSize)
            .then(res => {
                ctx.response.body = {
                    result: res, 
                    currentPageIndex: pageIndex,
                    nextPageIndex: pageIndex + 1
                };
            });
    },
    getSingleUser : async (ctx) => {
        let userName = ctx.params.userName;
        let result = {
            bidder : null,
            seller :  null
        };
        
        await mUser.findSellerByName(userName)
            .then(res => {
                result.seller = res[0];
            });
        if (result.seller != null) {   
            await mAuction.countAuctionsBySellerName(userName).then(res=> {
                    result.seller.auction_count = res[0].count;
                });
        }

        await mUser.findBidderByName(userName)
            .then(res => {
                result.bidder = res[0];
            });
        if (result.bidder != null) {
            await mBid.countByBidderName(userName).then(res=> {
                result.bidder.bid_count = res[0].count;
            });
        }
        ctx.response.body = await result;
    },

    getBidsByName : async (ctx) => {
        let pageIndex = ctx.request.body.pageIndex;
        let pageSize =  ctx.request.body.pageSize;
        let userName = ctx.params.userName;
        await mBid.findBidsByBidderName(userName, pageIndex, pageSize)
            .then(result => {
                ctx.response.body = {
                    'result' : result,
                    'currentPageIndex': pageIndex, 
                    'nextPageIndex': pageIndex + 1
                }
            });
    },

    getAuctionsBySellerName : async (ctx) => {
        let pageIndex = ctx.request.body.pageIndex;
        let pageSize =  ctx.request.body.pageSize;
        let userName = ctx.params.userName;
        await mAuction.findAuctionsBySellerName(userName, pageIndex, pageSize)
            .then(result => {
                ctx.response.body = {
                    'result' : result,
                    'currentPageIndex': pageIndex, 
                    'nextPageIndex': pageIndex + 1
                }
            });
    },

    getSellersByName : async (ctx)=> {
        let sellerName = ctx.request.body.sellerName;
        let isElastic =  ctx.request.body.isElastic;
        let limitNum = ctx.request.body.limitNum;

        if (!isElastic) {
            await mUser.findSellerByName(sellerName)
                .then(result => {
                    ctx.response.body = result

                });
        } else {
            await mUser.findSellerByNameElastic(sellerName, limitNum)
            .then(result => {
                ctx.response.body = result
            });
        }
    }
}

module.exports = UserController;