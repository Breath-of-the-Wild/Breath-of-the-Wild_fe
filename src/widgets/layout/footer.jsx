import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
     <div className="bg-white">
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4" color="blue-gray">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-500 lg:w-2/5">
              {description}
            </Typography>
            <br />
            <Typography variant="h6" className="font-normal text-blue-gray-500">
              {socials}
            </Typography>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items, links }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}

Footer.defaultProps = {
  title: "출처",
  description:
    "중앙정보인재개발원",
  socials:
  "서울 강남구 테헤란로 7길 7(역삼동 에스코빌딩 6층)",
  menus: [
    {
      name: "기타 링크",
      items: [
        {
          name: "깃",
          path: "https://github.com/orgs/Breath-of-the-Wild/repositories",
        },
        {
          name: "유튜브",
          path: "https://www.youtube.com/watch?v=sgIYoFvaeM0",
        },
        {
          name: "노션",
          path: "https://www.notion.so/620ce2e880ec4d6f871ee51ad7a438ce",
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} 중앙의 전설{" "}
      <a
        href="#"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        야생의 숨결
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
