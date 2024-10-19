class HomeController {
  static renderHomepage(req, res) {
    res.render('home/index', 
      { 
        metaTitle: 'Магазин для домашніх тварин',
        cssFilePath: 'home/index',
      }
    );
  }
  
  static renderAboutPage(req, res) {
    res.render('home/about',
      { 
        metaTitle: 'Про нас - Магазин для домашніх тварин',
        cssFilePath: 'home/about',
      }
    );
  }
}

export default HomeController;
