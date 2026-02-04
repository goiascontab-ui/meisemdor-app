export function PhoneMockup() {
  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-3xl z-10"></div>
        
        {/* Screen */}
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
          {/* Status Bar */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 flex items-center justify-between text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Gerador de Recibos</h3>
              <p className="text-xs text-gray-600">Crie recibos profissionais</p>
            </div>
            
            {/* Form Preview */}
            <div className="space-y-2">
              <div className="bg-gray-100 rounded-lg p-2">
                <div className="text-xs text-gray-500 mb-1">Nome do Cliente</div>
                <div className="h-6 bg-white rounded border border-gray-200"></div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-2">
                <div className="text-xs text-gray-500 mb-1">Valor</div>
                <div className="h-6 bg-white rounded border border-gray-200"></div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-2">
                <div className="text-xs text-gray-500 mb-1">Descrição</div>
                <div className="h-12 bg-white rounded border border-gray-200"></div>
              </div>
            </div>
            
            {/* Button */}
            <div className="pt-2">
              <div className="bg-gradient-to-r from-secondary to-secondary-dark text-white text-center py-2.5 rounded-lg font-semibold text-sm shadow-md">
                Gerar PDF
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-blue-50 rounded-lg p-2 text-center">
                <div className="text-lg mb-1">📱</div>
                <div className="text-[10px] text-gray-700 font-medium">Mobile</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <div className="text-lg mb-1">⚡</div>
                <div className="text-[10px] text-gray-700 font-medium">Rápido</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating badges */}
      <div className="absolute -right-4 top-1/4 bg-white rounded-full px-3 py-1 shadow-lg text-xs font-semibold text-primary border border-primary/20">
        Grátis
      </div>
      <div className="absolute -left-4 bottom-1/4 bg-white rounded-full px-3 py-1 shadow-lg text-xs font-semibold text-secondary border border-secondary/20">
        Offline
      </div>
    </div>
  );
}
