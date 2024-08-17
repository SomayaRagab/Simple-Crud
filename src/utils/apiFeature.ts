import { Document, Query } from 'mongoose';

type QueryParam = Query<Document[], Document, {}>;

class APIFeatures {
  query: QueryParam;
  queryString: any; // You can define a more specific type for queryString if needed

  constructor(query: QueryParam, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): APIFeatures {
    const queryObj: any = { ...this.queryString };
    const excludedFields: string[] = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el: string) => delete queryObj[el]);

    Object.entries(queryObj).forEach(([key, value]: [string, any]) => {
      if (value === '') {
        delete queryObj[key];
      }
    });

    if (queryObj.title) {
      queryObj.title = { $regex: queryObj.title, $options: 'ix' };
    }
    if (queryObj.email) {
      queryObj.email = { $regex: queryObj.email, $options: 'ix' };
    }

    let queryStr: string = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match: string) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort(): APIFeatures {
    if (this.queryString.sort) {
      const sortBy: string = this.queryString.sort?.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): APIFeatures {
    if (this.queryString.fields) {
      const fields: string = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate(): APIFeatures {
    const page: number = this.queryString.page * 1 || 1;
    const limit: number = this.queryString.limit * 1 || 1000000;
    const skip: number = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
