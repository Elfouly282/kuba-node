/**
 * APIFeatures — chainable query helper for Mongoose.
 *
 * Usage:
 *   const features = new APIFeatures(Model.find(), req.query)
 *     .filter()
 *     .sort()
 *     .limitFields()
 *     .paginate();
 *   const docs = await features.query;
 */
class APIFeatures {
    /**
     * @param {mongoose.Query} query   - Mongoose query object (e.g. Model.find())
     * @param {Object}         reqQuery - req.query from Express
     */
    constructor(query, reqQuery) {
        this.query = query;
        this.reqQuery = reqQuery;
    }

    filter() {
        const queryObj = { ...this.reqQuery };
        const excluded = ['page', 'sort', 'limit', 'fields', 'lang'];
        excluded.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.reqQuery.sort) {
            const sortBy = this.reqQuery.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.reqQuery.fields) {
            const fields = this.reqQuery.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = parseInt(this.reqQuery.page, 10) || 1;
        const limit = parseInt(this.reqQuery.limit, 10) || 20;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        this.paginationMeta = { page, limit };
        return this;
    }
}

module.exports = APIFeatures;
