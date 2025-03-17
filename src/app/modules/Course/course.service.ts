import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.conostant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .Pagination()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...CourseRemainingData } = payload;
  // step 1 : basic course info update
  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    CourseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );
  // check if there is any pre requisite courses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted fides
    const deletedPreRequisite = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: {
            course: { $in: deletedPreRequisite },
          },
        },
      },
      {
        new: true,
      },
    );
  }

  return updatedBasicCourseInfo;
};
const deletedCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  updateCourseIntoDB,
  deletedCourseFromDB,
};
