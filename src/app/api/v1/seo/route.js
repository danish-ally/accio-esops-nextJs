import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Seo from "../../../../models/seo";
import auth from '../../../../middleware/adminauth';
import { headers } from "next/headers";



export async function POST(request) {
    try {

      const headersList = headers();
      const referer = headersList.get("authorization");
      console.log(referer,"aaaa");
      const verifytoken = await auth(referer);
      console.log("verifytoken", verifytoken);
  

      
      const requestBody = await request.json(); // Parse the entire request body
  
      // Validate the request body against the schema
      const { error } = Seo.validate(requestBody);
      if (error) {
        return NextResponse.json(
          { error: true, message: error.details[0].message },
          { status: 400 }
        );
      }
  
      await connectMongoDB();
  
      // Check if pageUrl, ogUrl, or ogImageUrl already exist
      const existingSeo = await Seo.findOne({
        $or: [
          { pageUrl: requestBody.pageUrl }
        ]
      });
  
      if (existingSeo) {
        return NextResponse.json(
          { error: true, message: "A SEO entity with this pageUrl already exists." },
          { status: 400 }
        );
      }
  
      // Create a new SEO entity
      const newSeo = new Seo(requestBody);
      await newSeo.save();
  
      return NextResponse.json(
        { message: "SEO entity added successfully" },
        { status: 201 }
      );
    } catch (error) {

      console.error("Error creating SEO entity:", error);
      if(error.authenticationError){
        return NextResponse.json(
                { message: error.message , error: error.message },
                { status: error.status }
              );
      }else{
        return NextResponse.json(
          { message: "Failed to add SEO entity", error: error.message },
          { status: 500 }
        );
      }
      
    }
  }


  export async function GET(request) {
    try {
      await connectMongoDB();
  
      const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
      const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10;
      const search = request.nextUrl.searchParams.get("search");
  
      // Build the query based on the provided filters
      const query = {};
  
      if (search) {
        const regexSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
        
  
        query.$or = [
          { seoTitle: { $regex: new RegExp(regexSearch, 'i') } },
          { ogTitle: { $regex: new RegExp(regexSearch, 'i') } },
          { pageUrl: { $regex: new RegExp(regexSearch, 'i') } },
          { ogUrl: { $regex: new RegExp(regexSearch, 'i') } },
          { ogImageUrl: { $regex: new RegExp(regexSearch, 'i') } },
          { status: { $regex: new RegExp(regexSearch, 'i') } },
        ];
      }
  
      const options = {
        skip: (page - 1) * limit,
        limit: limit,
        sort: { createdAt: -1 }
      };
  
      const seo = await Seo.find(query, null, options);
      const totalSeo = await Seo.countDocuments(query);
  
      const noOfPages = Math.ceil(totalSeo / limit);
      const seoPerPageCount = seo.length;
  
      return NextResponse.json({
        status: 1,
        message: 'Got All Seo successfully',
        noOfSeo: totalSeo,
        noOfPages,
        seoPerPageCount,
        currentPage: page,
        seo,
      });
    } catch (error) {
      console.error('Error fetching seo', error);
      
       
        return NextResponse.json(
          { message: 'Failed to fetch Seo', error: error.message },
          { status: 500 }
        );
      
    
    }
  }


  
// catch (error) {
  //   console.error('Error fetching leads:', error);
  //   if(error.authenticationError){
  //     return NextResponse.json(
  //       { message: error.message , error: error.message },
  //       { status: error.status }
  //     );
  //   }else{
  //     return NextResponse.json(
  //       { message: 'Failed to fetch leads', error: error.message },
  //       { status: 500 }
  //     );
  //   }
    
  // }