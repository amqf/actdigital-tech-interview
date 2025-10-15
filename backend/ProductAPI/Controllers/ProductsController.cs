using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models;
using ProductAPI.DTOs;

namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(ProductDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            _logger.LogInformation(
                "Listagem de produtos retornou {Count} itens",
                products.Count
            );
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                _logger.LogWarning(
                    "Tentativa de buscar produto inexistente: Id={ProductId}",
                    id
                );
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(ProductDTO productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                Stock = productDto.Stock
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            _logger.LogInformation(
                "Produto criado: Id={ProductId}, Nome={ProductName}, Preço={Price}, Estoque={Stock}", 
                product.Id, product.Name, product.Price, product.Stock
            );

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDTO productDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                _logger.LogWarning(
                    "Tentativa de atualizar produto inexistente: Id={ProductId}",
                    id
                );
                return NotFound();
            }

            var oldStock = product.Stock;
            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.Stock = productDto.Stock;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation(
                    "Produto atualizado: Id={ProductId}, Nome={ProductName}, Estoque={OldStock}→{NewStock}",
                    id, product.Name, oldStock, product.Stock
                );
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ProductExists(id))
                {
                    _logger.LogWarning(
                        "Conflito de concorrência ao atualizar produto inexistente: Id={ProductId}",
                        id
                    );
                    return NotFound();
                }
                else
                {
                    _logger.LogError(
                        ex,
                        "Erro de concorrência ao atualizar produto: Id={ProductId}",
                        id
                    );
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                _logger.LogWarning(
                    "Tentativa de excluir produto inexistente: Id={ProductId}",
                    id
                );
                return NotFound();
            }

            var productName = product.Name;
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            _logger.LogInformation(
                "Produto excluído: Id={ProductId}, Nome={ProductName}",
                id, productName
            );

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}