import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .toUpperCase();
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [crumbs, setCrumbs] = useState<{ breadcrumb: string; href: string }[]>(
    []
  );

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: router.pathname.split("/")[i + 1],
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });
      pathArray.unshift({ breadcrumb: "home", href: "/" });
      setCrumbs(pathArray);
    }
  }, [router]);

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      borderWidth={"1px"}
      py={2}
      px={4}
      borderRadius={"md"}
      mb={4}
    >
      {crumbs.map((b, i) => (
        <BreadcrumbItem key={i}>
          <Link href={b.href}>
            <BreadcrumbLink>{b.breadcrumb}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
